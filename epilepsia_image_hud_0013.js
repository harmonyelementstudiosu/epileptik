function AddHud() {
    let hudStyleElement;
    window.epilepsialoader = window.epilepsialoader || {};
    function formatNumberWithDots(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    epilepsialoader.addLabel = function (message) {
        let notificationElement = document.getElementById('epilepsialoader-notification');
        if (!notificationElement) {
            notificationElement = document.createElement('div');
            notificationElement.id = 'epilepsialoader-notification';
            notificationElement.style.position = 'fixed';
            notificationElement.style.bottom = '20px';
            notificationElement.style.right = '20px';
            notificationElement.style.backgroundColor = 'white';
            notificationElement.style.color = 'black';
            notificationElement.style.padding = '15px 20px';
            notificationElement.style.borderRadius = '0';
            notificationElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            notificationElement.style.zIndex = '10000';
            notificationElement.style.fontSize = '14px';
            notificationElement.style.fontFamily = 'Arial, sans-serif';
            notificationElement.style.minWidth = '250px';
            notificationElement.style.textAlign = 'left';
            document.body.appendChild(notificationElement);
        }
        notificationElement.textContent = message;
        setTimeout(() => {
            if (notificationElement && notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
        }, 5000);
    };

    // --- НАЧАЛО ИЗМЕНЕНИЙ ---

    // Функция для показа уведомления о загрузке
    function showLoadNotification() {
        epilepsialoader.addLabel("Old HUD by Radmir has been successfully loaded!");
    }

    const hudScript = document.currentScript;
    const hudElements = [];
    const oldRadmirConfig = {
        icons: {
            "active_wanted": "",
            "armour": "",
            "breath": "",
            "cash": "https://i.imgur.com/1rOwRqJ.png", // Пример иконки доллара (замените на нужную)
            "circle": "",
            "health": "",
            "hunger": "",
            "inactive_wanted": "",
            "wanted_back": "",
            "weapon_back": "",
            "zone": "" // Убедитесь, что тут правильный путь к изображению
        },
        weapon: {
            "0": "",
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": "",
            "10": "",
            "11": "",
            "12": "",
            "13": "",
            "14": "",
            "15": "",
            "16": "",
            "17": "",
            "18": "",
            "19": "",
            "20": "",
            "22": "",
            "23": "",
            "24": "",
            "25": "",
            "26": "",
            "27": "",
            "28": "",
            "29": "",
            "30": "",
            "31": "",
            "32": "",
            "33": "",
            "34": "",
            "35": "",
            "36": "",
            "37": "",
            "38": "",
            "39": "",
            "40": "",
            "41": "",
            "42": "",
            "43": "",
            "44": "",
            "46": ""
        },
        logo: {
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": "",
            "10": "",
            "11": "",
            "12": "",
            "13": "",
            "14": "",
            "15": "",
            "16": "",
            "17": "",
            "18": "",
            "19": "",
            "20": "",
            "21": ""
        },
    };

    function createHud() {
        hudStyleElement = document.createElement("style");
        hudStyleElement.id = "hudStyles";

        // --- CSS из вашего исходного файла ---
        // Этот блок включает в себя все ваши шрифты, стили для HUD, окон, инвентаря и т.д.
        hudStyleElement.innerHTML = `
@font-face{font-family:'GothamPro Light';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_light.ttf') format('truetype');font-weight:300;font-style:normal}@font-face{font-family:'GothamPro Light Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_lightitalic.ttf') format('truetype');font-weight:300;font-style:italic}@font-face{font-family:'GothamPro Regular';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro.ttf') format('truetype');font-weight:400;font-style:normal}@font-face{font-family:'GothamPro Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_italic.ttf') format('truetype');font-weight:400;font-style:italic}@font-face{font-family:'GothamPro Medium';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_medium.ttf') format('truetype');font-weight:500;font-style:normal}@font-face{font-family:'GothamPro Medium Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_mediumitalic.ttf') format('truetype');font-weight:500;font-style:italic}@font-face{font-family:'GothamPro Bold';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_bold.ttf') format('truetype');font-weight:700;font-style:normal}@font-face{font-family:'GothamPro Bold Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_bolditalic.ttf') format('truetype');font-weight:700;font-style:italic}@font-face{font-family:'GothamPro Black';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_black.ttf') format('truetype');font-weight:900;font-style:normal}@font-face{font-family:'GothamPro Black Italic';src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_blackitalic.ttf') format('truetype');font-weight:900;font-style:italic}
      .Old-Fixed-Hud,
      .Old-Fixed-HudTop,
      .Old-Fixed-Logo,
      .Old-Fixed-Main,
      .Old-Fixed-Params,
      .Old-Fixed-Cash,
      .Old-Fixed-Params__all,
      .Old-Fixed-Param,
      .Old-Fixed-Weapon,
      .Old-Fixed-Wanted,
      .Old-Fixed-HudBottom{
      z-index: -1;
      font-family: Consolas, monospace; /* Изменено: установлен шрифт Consolas */
      }
      #app .hud-radmir-wanted {
        display: none;
      }
      body #app .hud-radmir-info {display: none}
      .hud-hassle-map .map-mask{
       display: none;
      }
      .Old-Fixed-Logo img,.Old-Fixed-HudTop{
       transform-origin:top right
      }
      .Ammo-in-clip{
       font-family:'GothamPro Bold Italic';
       font-weight:900;
       font-style:italic
      }
      .Old-Fixed-HudTop{
       position:absolute;
       right:1.4vw;
       top:3.4vh;
       display:flex;
       flex-direction:column;
       align-items:flex-end
      }
      .Old-Fixed-Logo{
       position:relative;
       margin-bottom:3vh
      }
/* Лого */
      .Old-Fixed-Logo img{
       width:20.52vh;
       height:6.2vh;
       margin-right:2vh
      }
      .Old-Fixed-Bonus{
       background-color: #000000ff;
       width: 33px;
       height: 33px;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 16px;
       color: #fff;
       font-weight: 700;
       position: absolute;
       bottom: -5px;
       right: -2px;
       border-radius: 50%;
       font-family:"GothamPro Black Italic";
       font-style:italic;
       font-size:1.39vh;
      }
      .Old-Fixed-Main,.Old-Fixed-Cash,.Wanted_row{
       align-items:center;
       display:flex
      }
      .Old-Fixed-Main{
       margin-top:.46vh;
       margin-right:3.46vh
      }
      .Old-Fixed-Weapon{
       width:16.6vh;
       height:16.6vh;
       position:relative;
       display:flex;
       justify-content:flex-end;
       margin-left:-.93vh;
       margin-right:.46vh
      }
      .Ammo-in-clip,.old-param__icon{
       margin-right:1.11vh
      }
      .Old-Fixed-Weapon_back{
       position:absolute;
       right:-1.4vh;
       top:-1.6vh;
       z-index:-1
      }
      .Old-Fixed-Weapon_icon{
       width:40vh;
       height:17.6vh
      }
      .Old-Fixed-Weapon_ammo{
       position:absolute;
       bottom:3.6vh;
       right:5vh;
       display:flex;
       align-items:flex-end;
       color: #fff;
      }
      .Ammo-in-clip{
       font-size:2.31vh;
       line-height:1;
       text-shadow:0 0 .46vh #00000080
      }
      .Ammo-full{
       font-family:'GothamPro Light Italic';
       font-weight:300;
       font-style:italic;
       font-size:1.67vh;
       text-shadow:0 0 .46vh #000000b3
      }
      .Old-Fixed-Params{
       height:13.5vh;
       position:relative;
       z-index:1
      }
      .Old-Fixed-Cash{
       justify-content:flex-end;
       color: white;
       font-family:"GothamPro Black Italic";
       font-style:italic;
       font-size:2.59vh;
       text-shadow:0 0 .46vh #00000080;
       font-weight: bold; /* Изменено: деньги - жирный шрифт */
      }
      .Old-Fixed-Cash img{
       margin-right: 13px;
       margin-top: 1px;
       width: 16px; /* Установлен размер иконки */
       height: 16px;
      }
      .Old-Fixed-Params__all{
       margin-top:1vh;
       display: flex; /* Изменено: параметры в одну строку */
       gap: 10px; /* Отступ между параметрами */
      }
      .Old-Fixed-Param{
       display:flex;
       align-items:center;
       margin-top:0; /* Изменено: убраны вертикальные отступы */
       /* Высота каждого параметра немного отличается */
       padding: 2px 5px;
       min-height: 20px;
       max-height: 25px;
      }
      .Old-Fixed-Param.health{
        margin-left:1.45vh;
      }
      .Old-Fixed-Param.armour,.Old-Param-Values{
       margin-left:.93vh;
      }
      /* Убраны полосы */
      .Old-Param-Progress,.Old-Progress__Values{
       display: none; /* Скрыто */
      }
      .Old-Param-Values{
       font-family: Consolas, monospace; /* Изменено: установлен шрифт Consolas */
       color: white;
       width: auto; /* Ширина по содержимому */
       font-size:1.67vh;
       text-shadow:0 0 .46vh #000000b3;
       font-weight: normal; /* Изменено: обычный шрифт для всех кроме денег */
      }
      .Old-Fixed-Freeze_text{
        margin-right:1vh;
      }
      .Old-Fixed-Freeze_value, .Old-Fixed-Freeze_text{
       font-family:"GothamPro Bold";
       font-weight:900;
       color:#c0ccec;
       font-size:2vh;
       text-shadow:0 0 2vh #000
      }
      .Old-Fixed-Param.hunger{
       margin-left: .09vh
      }
      .Old-Fixed-Param.breath{
       margin-left: 3px
      }
      .old-param.health .old-param__icon { width: 1.4vh; height: 1.2vh; }
      .old-param.armour .old-param__icon { width: 1.4vh; height: 1.4vh; }
      .old-param.hunger .old-param__icon { width: .9vh; height: 1.4vh; }
       position: relative;
       margin-right: 6vh;
       margin-top: -1.6vh;
      }
      .Old-Fixed-Param.breath .old-param__icon{
       width:1.7vh;
       height:1.7vh
      }
.Old-Fixed-Wanted {
   position: relative;
   transform: translateX(-7.2vh);
   margin-top: -0.4vh; /* Ещё более сильное смещение вниз */
}
.Old-Fixed-Wanted_back {
   position: absolute;
   right: -0.5vh;
   top: 0.2vh;
   z-index: -1;
}
.Wanted_row img {
   width: 2.1vh;
   height: 2.1vh;
   padding: 0.01vh 0.1vh;
}
      .Old-Fixed-HudBottom{
        transform-origin: right bottom;
        position: absolute;
        right: 0;
        top: 20px;
      }
      .Old-Fixed-ZZ{
       position:absolute;
       left:21.3vh; /* Исправлено: изменено значение left, если нужно */
       bottom:2vh; /* Исправлено: изменено значение bottom */
       display: block; /* Принудительно устанавливаем display: block */
      }
      .Old-Fixed-ZZ_icon{
       width:4.5vh;
       height:4.5vh
      }
      .Old-Fixed-Freeze {
        position: absolute;
        background: hsl(190deg 63% 66% / 40%);
        width: 26.1111vh;
        height: 0.65vh;
        border-radius: 1vh;
        outline: hsl(0deg 0% 0% / 20%) 0.2vh solid;
        outline-offset: 0.1vh;
        overflow: hidden;
        left: 11.1620vh;
        bottom: 2.7778vh;
      }
        ///*RADAR*///
      #app .hud-radmir-radar__map { 
  width: 21.9vh !important; 
  height: 20.9vh !important; 
  overflow: hidden; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  border-radius: 0; 
  border: none !important;
  box-shadow: 0 5px 25px rgba(139, 195, 221, 0.81); /* Ледяная тень */
}
body #app .hud-radmir-radar__map { 
  transition: .3s 
}
#app .hud-hassle-map { 
  width: 32vh !important; 
  height: 32vh !important 
}
#app .hud-radmir-radar__radar { 
  width: 26.3vh; 
  border-radius: 0;
  box-shadow: none;
}
#app .hud-radmir-radar { 
  left: 7.2vh 
}
      body .OLD-RADMIR-logo__bonus {
    background: #000000c5
}
/* ---------- Fuel Menu ---------- */
#app .fuel__button .text:before { 
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMyAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMS40NTEgMUw0LjQ4NCA3Ljg0OEwxIDQuNDI0IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KPC9zdmc+DQo=) center/contain no-repeat !important 
} 
#app .fuel__container:before { 
  opacity: 0 
} 
#app .fuel__container { 
  padding: 3.33vh 2.96vh;
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%);
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
  border-radius: 4px;
  transition: all 0.2s ease;
}
#app .fuel__container:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
#app .fuel__title { 
  font-size: 2.04vh; 
  line-height: 1.94vh; 
  color: #fff; 
  text-align: left 
} 
#app .fuel__close { 
  left: auto !important; 
  top: -.5vh !important; 
  right: 0; 
  display: flex; 
  flex-direction: row-reverse; 
  gap: .5vh 
} 
#app .fuel__close:hover img { 
  filter: drop-shadow(0 0 8px #ffffff80) !important 
} 
#app .fuel__fill .range-slider-fill { 
  background-color: #fff !important 
} 
#app .fuel__fill .range-slider-knob { 
  background: #fff !important 
} 
#app .fuel__fill-data .text { 
  color: hsla(0, 0%, 100%, .65) !important 
} 
#app .fuel__fill-data .value { 
  color: #fff !important 
} 
#app .fuel__class-col.selected, 
.fuel__class-col:hover { 
  background: linear-gradient(145deg, #555555 0%, #666666 50%, #555555 100%) !important;
  box-shadow: 0 12px 22px #ffffff14 !important; 
  color: #000 !important 
} 
#app .fuel__button { 
  background: linear-gradient(185.93deg, #fff -22.13%, #e6e6e6 122.51%) !important; 
  color: #000 !important;
  border-radius: 3px;
  border: 1px solid #cccccc;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
} 
#app .fuel__button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  transition: left 0.3s;
}
#app .fuel__button:hover::before {
  left: 100%;
}
#app .fuel__button:hover { 
  box-shadow: 0 6px 20px #ffffff40 !important;
  background: linear-gradient(185.93deg, #f0f0f0 -22.13%, #dcdcdc 122.51%) !important;
} 
#app .fuel__button:active {
  background: linear-gradient(185.93deg, #e0e0e0 -22.13%, #cccccc 122.51%) !important;
  transform: scale(0.98);
}
/* ---------- Death Screen ---------- */
#app .death-waves { 
  background-image: none 
} 
#app .death_mobile .death-bg-lines_danger { 
  background-image: none 
} 
#app .death_mobile .death-bg-lines { 
  background-image: none 
} 
#app .death { 
  font-style: italic; 
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%) !important;
  border: 1px solid #333333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
} 
#app .death-timer { 
  font-style: italic;
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%) !important;
  border: 1px solid #333333;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
} 
/* ---------- Info Cards ---------- */
body .info-card { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%);
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 31px !important;
  position: relative;
  transition: all 0.2s ease;
} 
body .info-card:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
body .info-card__data { 
  background: linear-gradient(145deg, #303030 0%, #383838 50%, #303030 100%);
  border: 1px solid #454545;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 31px;
  position: relative;
  transition: all 0.2s ease;
} 
body .info-card__data:hover {
  border-color: #5a5a5a;
  box-shadow: 0 2px 5px rgba(85, 85, 85, 0.3);
}
body .info-card .text { 
  color: #cfcfcf 
} 
/* ---------- Vue3 Slider ---------- */
#app .vue3-slider .track-filled, 
.vue3-slider .handle { 
  background-color: #ffffff !important 
} 
/* ---------- Container ---------- */
#app .container { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%);
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
} 
#app .container:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
/* ---------- Trade Window ---------- */
#app .trade-items { 
  background: none 
} 
#app .trade-items__container { 
  border-radius: 10px; 
  height: 613px; 
  width: 1283px; 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%) !important;
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: all 0.2s ease;
} 
#app .trade-items__container:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
#app .trade-items-main { 
  right: -1.2vw; 
  top: -2vh 
} 
/* ---------- Chat (RADMIR) ---------- */
#app .radmir-chat-input__input input::selection { 
  background-color: #00ddff40 
} 
#app .radmir-chat__before { 
  position: fixed; 
  width: 100vw; 
  height: 41.66vw; 
  background: 0 0 !important; 
  left: 0; 
  top: 0; 
  z-index: -1; 
  opacity: 0; 
  transition: all .2s ease; 
  pointer-events: none 
} 
#app .radmir-chat-input__input { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%) !important;
  border-radius: 11px !important;
  border: 1px solid #404040;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: all 0.2s ease;
} 
#app .radmir-chat-input__input:hover {
  border-color: #555555;
}
#app .radmir-chat-input__input input { 
  margin-left: .9vh !important 
} 
#app .radmir-chat-input__input-lang { 
  margin-right: 1vh !important 
} 
#app .controls-button { 
  border-radius: .5vh;
  background: linear-gradient(145deg, #3a3a3a 0%, #454545 50%, #3a3a3a 100%);
  color: #ffffff !important;
  border: 1px solid #4a4a4a;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
} 
#app .controls-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.3s;
}
#app .controls-button:hover::before {
  left: 100%;
}
#app .controls-button:hover {
  background: linear-gradient(145deg, #4a4a4a 0%, #555555 50%, #4a4a4a 100%);
  border-color: #5a5a5a;
}
#app .controls-button:active {
  background: linear-gradient(145deg, #303030 0%, #3a3a3a 50%, #303030 100%);
  transform: scale(0.98);
}
/* ---------- Modals ---------- */
#app .modal-container-wrapper { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%) !important;
  border: 0.19vh solid #404040;
  border-radius: 2.5vh !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  position: relative;
  transition: all 0.2s ease;
} 
#app .modal-container-wrapper:hover {
  border-color: #555555;
  box-shadow: 0 6px 16px rgba(85, 85, 85, 0.5);
}
#app .modal_violet .modal-container { 
  border-top: none !important; 
} 
#app .modal-light__light { 
  background: none !important; 
} 
#app .modal-light__light_second { 
  background: none !important; 
} 
#app .modal-overlay { 
  background: rgba(0, 0, 0, 0.6) !important; 
} 
@media (platform:mobile) { 
  #app .modal_blue .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_blue .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_orange .modal-container { 
  border-top: none !important; 
} 
#app .modal_orange .modal-container-wrapper { 
  box-shadow: none !important; 
} 
@media (platform:mobile) { 
  #app .modal_orange .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_orange .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_violet .modal-container-wrapper { 
  box-shadow: none !important; 
} 
@media (platform:mobile) { 
  #app .modal_violet .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_violet .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_green .modal-container { 
  border-top: none !important; 
} 
#app .modal_green .modal-container-wrapper { 
  box-shadow: none !important; 
} 
@media (platform:mobile) { 
  #app .modal_green .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_green .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_red .modal-container { 
  border-top: none !important; 
} 
#app .modal_red .modal-container-wrapper { 
  box-shadow: none !important; 
} 
@media (platform:mobile) { 
  #app .modal_red .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_red .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_dark-orange .modal-container { 
  border-top: none !important; 
} 
#app .modal_dark-orange .modal-container-wrapper { 
  box-shadow: none !important; 
} 
@media (platform:mobile) { 
  #app .modal_dark-orange .modal-container-wrapper { 
    box-shadow: none !important; 
  } 
  #app .modal_dark-orange .modal-container { 
    border-width: 0.3704vh 
  } 
} 
#app .modal_overlay-violet-blue .modal-overlay { 
  background: none !important; 
} 
/* ---------- Windows ---------- */
body .window-bg { 
  background-image: none; 
} 
body .window__before { 
  background-image: none; 
} 
body .window__title { 
  text-align: center; 
  color: #ffffff; 
} 
body .window-table__item { 
  color: #fff; 
  border-radius: 2vh; 
  border: .09vh solid #ffffff00; 
  transition: .25s;
  background: linear-gradient(145deg, #303030 0%, #383838 50%, #303030 100%);
  border: 1px solid #404040;
  margin-bottom: 1px;
  position: relative;
  overflow: hidden;
} 
body .window-table__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
  transition: left 0.3s;
}
body .window-table__item:hover::before {
  left: 100%;
}
body .window-table__item.selected { 
  background: linear-gradient(145deg, #555555 0%, #666666 50%, #555555 100%) !important;
  color: #000000cd; 
  border: .09vh solid #f4f1e100 
} 
body .window-table__item:hover { 
  background: linear-gradient(145deg, #404040 0%, #4a4a4a 50%, #404040 100%);
  border-color: #555555;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.3);
} 
body .window-table__item.selected:hover { 
  background: linear-gradient(145deg, #666666 0%, #777777 50%, #666666 100%) !important;
  color: #000000cd; 
  border: 0.09vh solid #f4f1e100; 
} 
body .window-table__item:active {
  background: linear-gradient(145deg, #2a2a2a 0%, #303030 50%, #2a2a2a 100%);
  transform: scale(0.99);
}
body .window-button { 
  border-radius: 2vh; 
  color: #ffffff; 
  background: linear-gradient(145deg, #3a3a3a 0%, #454545 50%, #3a3a3a 100%);
  border: 1px solid #4a4a4a;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
} 
#app .window-button:hover { 
  color: #000000cd; 
  background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%);
  border-color: #cccccc;
} 
#app .window-button:first-child:hover { 
  background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%) !important;
} 
#app .window-button:first-child { 
  background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%) !important;
} 
#app .window-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  transition: left 0.3s;
}
#app .window-button:hover::before {
  left: 100%;
}
#app .window-button:active {
  background: linear-gradient(145deg, #e0e0e0 0%, #d0d0d0 50%, #e0e0e0 100%);
  transform: scale(0.98);
}
.graffiti-pattern__image[data-v-38ff9a6b] { 
  background: none !important; 
} 
/* ---------- Inventory ---------- */
#app .inventory { 
  background: none 
} 
#app .inventory-container__info__container { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%) !important;
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 1.1vh !important;
  padding: 2vh;
  position: relative;
  transition: all 0.2s ease;
} 
#app .inventory-container__info__container:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
#app .inventory-action__modal, 
#app .inventory-extra__container, 
#app .inventory-main { 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%);
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 1.1vh;
  padding: 2vh;
  position: relative;
  transition: all 0.2s ease;
} 
#app .inventory-action__modal:hover,
#app .inventory-extra__container:hover,
#app .inventory-main:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
#app .inventory-main__after, 
#app .inventory-main__before { 
  display: none 
} 
#app .inventory-player { 
  border: none; 
} 
#app .inventory-extra { 
  margin-bottom: 0; 
  margin-left: 1vh 
} 
#app .inventory__container, 
#app .inventory__controls { 
  justify-content: center; 
} 
#app .inventory-capacity, 
#app .inventory-container__box { 
  border-radius: 1vh; 
  border: .1vh solid #ffffff26; 
  background: linear-gradient(145deg, #303030 0%, #383838 50%, #303030 100%);
  position: relative;
  overflow: hidden;
} 
#app .inventory-container__slot { 
  border-radius: 1vh; 
  background: linear-gradient(145deg, #303030 0%, #383838 50%, #303030 100%);
  border: .1vh solid #ffffff26;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
} 
#app .inventory-container__slot:hover {
  border-color: #555555;
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.3);
}
#app .inventory-container__slot:active {
  background: linear-gradient(145deg, #2a2a2a 0%, #303030 50%, #2a2a2a 100%);
  transform: scale(0.99);
}
#app .inventory-container__slot::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent);
  transition: left 0.3s;
}
#app .inventory-container__slot:hover::before {
  left: 100%;
}
#app .inventory-capacity__bar__fill, 
#app .inventory-wear__bar__fill { 
  border-radius: 1vh; 
  background: linear-gradient(90deg, #555555 0%, #666666 100%);
} 
#app .inventory-capacity__bar, 
#app .inventory-wear__bar { 
  background: linear-gradient(145deg, #3a3a3a 0%, #404040 50%, #3a3a3a 100%);
  border-radius: 1vh; 
  width: 100%; 
  left: 1.5vh; 
  bottom: 1vh; 
} 
#app .inventory-extra__content { 
  padding-bottom: .833vw; 
} 
#app .inventory-action__modal { 
  padding: 2vh; 
  background: linear-gradient(145deg, #2a2a2a 0%, #353535 25%, #2a2a2a 50%, #303030 100%);
  border: 1px solid #404040;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 1.1vh; 
  position: relative;
  transition: all 0.2s ease;
} 
#app .inventory-action__modal:hover {
  border-color: #555555;
  box-shadow: 0 2px 6px rgba(85, 85, 85, 0.4);
}
#app .inventory-action__item__icon { 
  border-radius: 1vh; 
} 
#app .inventory-wear__content { 
  margin: .5vh 1vh 0; 
} 
#app .inventory-item-value { 
  padding: 0 2vh; 
  height: 4vh !important; 
  border-radius: 1vh !important; 
  border: .1vh solid #ffffff26 !important; 
  background: linear-gradient(145deg, #303030 0%, #383838 50%, #303030 100%) !important;
  position: relative;
  overflow: hidden;
} 
#app .inventory-wear__bar { 
  bottom: .8vh; 
} 
#app .inventory-container__count, 
#app .inventory-container__slot-image { 
  z-index: 1; 
} 
#app .inventory-container__actions { 
  border-bottom-left-radius: .8vh; 
  border-bottom-right-radius: .8vh; 
  overflow: hidden; 
} 
/* ---------- Radial Menu (player-interaction) - PRESERVED ---------- */
#app .player-interaction__container,
#app .player-interaction-layer {
  background: #494949b9;
  border: 1px solid #494949b9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}
#app .player-interaction__inner {
  background: #494949b9 !important;
  border: 1px solid #494949b9;
}
#app .player-interaction__icon,
#app .player-interaction__icon_active {
  fill: #e0e0e0 !important;
}
#app .player-interaction__title,
#app .player-interaction__title_active {
  color: #e0e0e0 !important;
}
#app .player-interaction__container {
  background-image: none !important;
}
#app .player-interaction__container::before {
  display: none !important;
}
  #app .capture-table {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%); /* Черно-серый градиент */
    box-shadow: 0 0 5vh 0 rgba(0, 0, 0, 0.3); /* Теневая подсветка */
    border-radius: 1vh;
    transform: scale(.9);
    padding: 1.5vh 1.8vh;
    position: relative;
    overflow: hidden;
}
#app .capture-table::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%);
    pointer-events: none;
    border-radius: 1vh;
}
#app .capture-table__col-kills,
#app .capture-table__col-kills.my,
#app .capture-table__timer {
    background: linear-gradient(145deg, #4a4a4a 0%, #666666 50%, #4a4a4a 100%); /* Серый градиент */
    color: #e0e0e0; /* Светло-серый текст */
    font-style: normal;
    font-weight: 900;
    font-size: 1.8vh;
    font-family: 'GothamPro Bold';
    border-radius: .5vh;
    position: relative;
    overflow: hidden;
}
#app .capture-table__col-kills::before,
#app .capture-table__col-kills.my::before,
#app .capture-table__timer::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.3s;
}
#app .capture-table__timer {
    width: 7.5vh;
    height: 3.7vh;
}
#app .capture-table__col-kills {
    margin: 0;
    width: 3.5vh;
    height: 3.5vh;
}
#app .capture-table__col .name {
    font-family: 'GothamPro Bold';
    font-style: normal;
    font-weight: 700;
    text-transform: none;
    color: #e0e0e0 !important; /* Светло-серый текст */
}
#app .capture-table__col-kills.my {
    margin-right: 1.3vh;
    margin-left: 0 !important;
    background: linear-gradient(145deg, #3a3a3a 0%, #555555 50%, #3a3a3a 100%) !important; /* Темно-серый градиент для своего */
    color: #ffffff !important; /* Белый текст */
}
#app .capture-table__col-kills {
    margin-left: 1.3vh;
    background: linear-gradient(145deg, #3a3a3a 0%, #555555 50%, #3a3a3a 100%) !important; /* Темно-серый градиент */
    color: #ffffff !important; /* Белый текст */
}
.OLD-RADMIR-green-zone__main {
    position: absolute;
    left: 1.5vh;
    bottom: 1vh;
    display: flex;
    align-items: center;
}
.OLD-RADMIR-green-zone__image {
    margin-right: .93vh;
}
.OLD-RADMIR-green-zone__text {
    color: #e0f7fa00; /* Светло-голубой */
    text-shadow: .28vh .28vh .46vh #00000000;
}
.OLD-RADMIR-green-zone__text div:first-child {
    font-size: 1.2vh;
    font-weight: 900;
    text-transform: uppercase;
}
.OLD-RADMIR-green-zone__text div:last-child {
    color: hsla(0, 0%, 100%, 0);
    font-size: 1.11vh;
    font-weight: 500;
    margin-top: .46vh;
}
  body .authorization{background:0 0}#app .authorization{background-image:url();background-size:auto 100vh}

      /* Дополнительное скрытие радара */
      #app .hud-radmir-radar { display: none !important; }
      #app .hud-hassle-map { display: none !important; }
      `;
      document.head.appendChild(hudStyleElement);

      // Создание HTML-структуры HUD (ваша оригинальная разметка)
      const hudElement = document.createElement("div");
      hudElement.id = 'OldHudContainer';
      hudElement.innerHTML = `
      <div class="Old-Fixed-Hud">
      <div class="Old-Fixed-HudTop">
        <div class="Old-Fixed-Logo">
           <img src="${oldRadmirConfig.logo[1]}">
           <div class="Old-Fixed-Bonus">x3</div>
        </div>
        <div class="Old-Fixed-Main">
           <div class="Old-Fixed-Params">
              <!-- Деньги -->
              <div class="Old-Fixed-Cash"><img src="${oldRadmirConfig.icons.cash}"><span>0</span></div>
              <!-- Параметры (Здоровье, Броня, Голод) -->
              <div class="Old-Fixed-Params__all">
                 <div class="Old-Fixed-Param health">
                    <img src="${oldRadmirConfig.icons.health}" class="old-param__icon">
                    <span class="Old-Param-Values">100</span>
                 </div>
                 <div class="Old-Fixed-Param armour">
                    <img src="${oldRadmirConfig.icons.armour}" class="old-param__icon">
                    <span class="Old-Param-Values">100</span>
                 </div>
                 <div class="Old-Fixed-Param hunger">
                    <img src="${oldRadmirConfig.icons.hunger}" class="old-param__icon">
                    <span class="Old-Param-Values">100</span>
                 </div>
              </div>
           </div>
           <div class="Old-Fixed-Weapon">
              <img src="${oldRadmirConfig.icons.wanted_back}" class="Old-Fixed-Weapon_back"> <img src="${oldRadmirConfig.weapon[0]}" class="Old-Fixed-Weapon_icon">
              <div class="Old-Fixed-Weapon_ammo"><span class="Ammo-in-clip">1</span><span class="Ammo-full">1</span></div>
           </div>
        </div>
        <div class="Old-Fixed-Wanted">
           <img src="${oldRadmirConfig.icons.weapon_back}" class="Old-Fixed-Wanted_back">
           <div class="Wanted_row"><img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"></div>
        </div>
      </div>
      <div class="Old-Fixed-HudBottom">
      <!-- Элемент ZZ -->
      <div class="Old-Fixed-ZZ"><img src="${oldRadmirConfig.icons.zone}" class="Old-Fixed-ZZ_icon"></div>
      <div class="Old-Fixed-Freeze">
      <span class="Old-Fixed-Freeze_text">Freeze:</span>
      <span class="Old-Fixed-Freeze_value">100</span>
      </div></div>
      `;
      document.body.appendChild(hudElement);
      hudElements.push(OldHudContainer);

      // Показать уведомление о загрузке
      showLoadNotification();
    }

    // --- КОНЕЦ ИЗМЕНЕНИЙ ---

    const updateFunctions = {
        show: (value) => {
            const hudEl = document.querySelector(".Old-Fixed-Hud");
            if (hudEl) hudEl.style.display = +value >= 1 ? "" : "none";
        },
        showBars: (value) => {
            updateFunctions.show(value);
        },
        weapon: (value) => {
            const weaponIcon = document.querySelector(".Old-Fixed-Weapon_icon");
            if (weaponIcon) {
                const weaponSrc = oldRadmirConfig.weapon[value];
                if (weaponSrc) {
                    weaponIcon.src = weaponSrc;
                }
            }
            const ammoEls = document.querySelectorAll(".Old-Fixed-Weapon_ammo span");
            ammoEls.forEach(el => {
                if (el) el.style.display = value >= 16 ? "" : "none";
            });
        },
        health: (value) => {
            updateParam("health", value);
        },
        armour: (value) => {
            updateParam("armour", value);
        },
        hunger: (value) => {
            updateParam("hunger", value);
        },
        breath: (value) => {
            const breathWrapper = document.querySelector(".Old-Fixed-Param.breath .Old-Param-Progress")?.parentElement;
            if (breathWrapper) breathWrapper.style.display = value < 99 ? "" : "none";
            updateParam("breath", value);
        },
        bonus: (bonusValue) => {
            const bonusEl = document.querySelector(".Old-Fixed-Bonus");
            if (bonusEl) {
                if (bonusValue <= 1) {
                    bonusEl.style.display = "none";
                } else {
                    bonusEl.style.display = "";
                    bonusEl.textContent = `x${bonusValue}`;
                }
            }
        },
        server: (serverId) => {
            const serverWrapper = document.querySelector(".Old-Fixed-Logo img");
            if (serverWrapper) {
                if (serverId <= 0) {
                    serverWrapper.style.display = "none";
                } else {
                    serverWrapper.style.display = "";
                    const serverLogo = oldRadmirConfig.logo[serverId];
                    if (serverLogo) {
                        serverWrapper.src = serverLogo;
                    }
                }
            }
        },
        money: (value) => {
            const moneyEl = document.querySelector(".Old-Fixed-Cash span");
            if (moneyEl) moneyEl.textContent = formatNumberWithDots(value);
        },
        wanted: (value) => {
            updateWanted(value);
            const wantedWrapper = document.querySelector(".Old-Fixed-Wanted");
            if (wantedWrapper) {
                if (value === 0 && !oldRadmirConfig.wantedAlwaysShow) {
                    wantedWrapper.style.display = "none";
                    return;
                }
                wantedWrapper.style.display = "";
            }
            const wantedEls = document.querySelectorAll(".Wanted_row img");
            wantedEls.forEach((el, index) => {
                if (el) {
                    if ((5 - index) / value >= 1 || (5 - index === 0 && value === 0)) {
                        el.src = oldRadmirConfig.icons.inactive_wanted;
                        el.className = "wanted-innactive";
                    } else {
                        el.src = oldRadmirConfig.icons.active_wanted;
                        el.className = "wanted-active";
                    }
                }
            });
        },
        ammoInClip: (value) => {
            const inClipEl = document.querySelector(".Ammo-in-clip");
            if (inClipEl) inClipEl.textContent = value;
        },
        totalAmmo: (value) => {
            const totalAmmoEl = document.querySelector(".Ammo-full");
            if (totalAmmoEl) totalAmmoEl.textContent = "/" + value;
        },
        freeze: (value) => {
            const freezeValueEl = document.querySelector(".Old-Fixed-Freeze_value");
            if (freezeValueEl) {
                const formattedValue = String(value).padStart(3, '0');
                freezeValueEl.textContent = formattedValue;
            }
        },
        /*freeze2: () => {
            const freezeEl = document.querySelector(".Old-Fixed-Freeze");
            const isVisible = window.interface("Hud").isNewYear;
            if (freezeEl) {
                freezeEl.style.display = isVisible ? "" : "none";
            }
        },*/
        greenZone: (isVisible) => {
            const greenZoneEl = document.querySelector(".Old-Fixed-ZZ");
            if (greenZoneEl) {
                // Обновлено: проверяем isVisible, но также убедимся, что display не равно none по умолчанию
                greenZoneEl.style.display = isVisible ? "" : "none";
            }
        },
    };

    function onInfoChange(type, value) {
        setTimeout(() => {
            // loadingNotification не определен в этом фрагменте кода, закомментировано
            // loadingNotification.style.opacity = '0';
            // setTimeout(() => {
            //     if (loadingNotification) {
            //         loadingNotification.remove();
            //     }
            // }, 2500);
        }, 1000);
        if (updateFunctions[type]) {
            updateFunctions[type](value);
        }
        const hudInfo = window.interface("Hud").info;
        Object.entries(updateFunctions).forEach(([key, func]) => {
            if (typeof func === "function" && hudInfo.hasOwnProperty(key)) {
                func(hudInfo[key]);
            }
        });
    }

    function updateParam(paramClass, value) {
        const paramElement = document.querySelector(`.Old-Fixed-Param.${paramClass}`);
        if (paramElement) {
            const valueText = paramElement.querySelector(".Old-Param-Values");
            valueText.textContent = value;
        }
    }

    function updateWanted(level) {
        const wantedIcons = document.querySelectorAll(".Wanted_row img");
        wantedIcons.forEach((icon, index) => {
            if (index < level) {
                icon.classList.remove("wanted-innactive");
                icon.classList.add("wanted-active");
            } else {
                icon.classList.remove("wanted-active");
                icon.classList.add("wanted-innactive");
            }
        });
    }

    function initializeHudProxy() {
        const checkInterval = setInterval(() => {
            if (typeof window.interface === "function" && window.interface("Hud").info) {
                clearInterval(checkInterval);
                const hudInfo = window.interface("Hud").info;
                const clonedHudInfo = JSON.parse(JSON.stringify(hudInfo));
                // Инициализировать greenZoneEl после создания DOM
                let greenZoneEl = document.querySelector(".Old-Fixed-ZZ");
                window.interface("Hud").info = new Proxy(clonedHudInfo, {
                    set(target, prop, value) {
                        if (target[prop] !== value) {
                            target[prop] = value;
                            onInfoChange(prop, value);
                        }
                        return Reflect.set(target, prop, value);
                    }
                });
                window.interface("Hud").setServer = (serverId) => {
                    onInfoChange("server", serverId);
                    window.interface("Hud").server = serverId;
                };
                window.interface("Hud").setBonus = (bonusValue) => {
                    onInfoChange("bonus", bonusValue);
                    window.interface("Hud").bonus = bonusValue;
                };
                // window.interface("Hud").showGreenZoneTab = () => { // Пример добавления метода
                //     if (greenZoneEl) greenZoneEl.style.display = ""; // Показать
                // };
                // window.interface("Hud").hideGreenZoneTab = () => { // Пример добавления метода
                //     if (greenZoneEl) greenZoneEl.style.display = "none"; // Скрыть
                // };
            }
        }, 100);
    }

    initializeHudProxy();
    createHud();
    // Принудительно показать элемент ZZ после создания HUD, если он существует
    const initialZZElement = document.querySelector(".Old-Fixed-ZZ");
    if (initialZZElement) {
        initialZZElement.style.display = "block"; // Устанавливаем display на block
        // Или вызываем функцию greenZone с true, если она должна управлять этим
        // updateFunctions.greenZone(true); // Это также сработает, если функция правильно настроена
    }
    window.onInfoChange = onInfoChange;
    setTimeout(() => {
        hudElements.forEach(el => el.remove());
        if (hudScript) {
            hudScript.remove();
        }
        if (hudStyleElement) {
            hudStyleElement.remove();
        }
    });
}

AddHud();