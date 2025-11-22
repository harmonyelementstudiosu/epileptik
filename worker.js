export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Проверяем, что путь соответствует формату /owner/repo/file
    const pathParts = path.split('/').filter(part => part.length > 0);
    
    if (pathParts.length < 3) {
      return new Response('Invalid path. Use: /owner/repo/file', { status: 400 });
    }
    
    const owner = pathParts[0];
    const repo = pathParts[1];
    const filePath = pathParts.slice(2).join('/');
    
    // Формируем URL для GitHub raw content
    const githubUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
    
    try {
      // Делаем запрос к GitHub
      const response = await fetch(githubUrl, {
        method: request.method,
        headers: {
          'User-Agent': 'Cloudflare Worker GitHub Proxy',
          ...Object.fromEntries(
            Array.from(request.headers.entries()).filter(([key]) =>
              !key.startsWith('cf-') && key !== 'host' && key !== 'origin'
            )
          )
        }
      });
      
      // Создаем новый Response с контентом из GitHub
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
          'Cache-Control': 'public, max-age=300', // Кэшируем на 5 минут
          'Access-Control-Allow-Origin': '*', // Разрешаем CORS
        }
      });
      
      return modifiedResponse;
    } catch (error) {
      return new Response(`Error fetching from GitHub: ${error.message}`, { status: 500 });
    }
  }
};