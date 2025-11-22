export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Проверяем, что путь соответствует формату /owner/repo/file
    const pathParts = path.split('/').filter(part => part.length > 0);
    
    // Для корневого пути возвращаем информацию
    if (pathParts.length === 0) {
      return new Response('GitHub Proxy Worker is running', { 
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    if (pathParts.length < 3) {
      return new Response('Invalid path. Use: /owner/repo/file\nExample: /harmonyelementstudiosu/epileptik/epilepsia_image_hud_0001.js', { 
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    const owner = pathParts[0];
    const repo = pathParts[1];
    const filePath = pathParts.slice(2).join('/');
    
    // Формируем URL для GitHub raw content
    const githubUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
    
    // Логируем запрос для отладки
    console.log(`Proxying request to: ${githubUrl}`);
    
    try {
      // Делаем запрос к GitHub
      const response = await fetch(githubUrl, {
        method: request.method,
        headers: {
          'User-Agent': 'Cloudflare-Worker-GitHub-Proxy',
          'Accept': '*/*'
        }
      });
      
      // Проверяем, успешен ли запрос
      if (!response.ok) {
        return new Response(`GitHub returned ${response.status}: ${response.statusText}`, { 
          status: response.status,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
      
      // Получаем контент и тип контента
      const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
      const content = await response.arrayBuffer();
      
      // Создаем новый Response с контентом из GitHub
      const modifiedResponse = new Response(content, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=300', // Кэшируем на 5 минут
          'Access-Control-Allow-Origin': '*' // Разрешаем CORS
        }
      });
      
      return modifiedResponse;
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      return new Response(`Error fetching from GitHub: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
