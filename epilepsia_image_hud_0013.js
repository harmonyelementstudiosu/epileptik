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

        // --- CSS ---
        hudStyleElement.innerHTML = `
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
        margin-top:0;
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

      // Создание HTML-структуры HUD
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
                 <!-- Полоса здоровья -->
                 <div class="Old-Fixed-Param health">
                    <div class="hp-bar" style="width: 40px; height: 15px; background-color: red; border: 3px solid black; display: flex; align-items: center; justify-content: center; color: white; font-family: Consolas, monospace; font-size: 12px;">
                       <span class="Old-Param-Values">100</span>
                    </div>
                 </div>
                 <!-- Полоса брони -->
                 <div class="Old-Fixed-Param armour">
                    <div class="armour-bar" style="width: 40px; height: 15px; background-color: blue; border: 3px solid black; display: flex; align-items: center; justify-content: center; color: white; font-family: Consolas, monospace; font-size: 12px;">
                       <span class="Old-Param-Values">100</span>
                    </div>
                 </div>
                 <!-- Полоса голода -->
                 <div class="Old-Fixed-Param hunger">
                    <div class="hunger-bar" style="width: 40px; height: 15px; background-color: #FFA500; border: 3px solid black; display: flex; align-items: center; justify-content: center; color: white; font-family: Consolas, monospace; font-size: 12px;">
                       <span class="Old-Param-Values">100</span>
                    </div>
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
            const hpBar = document.querySelector(".hp-bar");
            if (hpBar) {
                hpBar.style.width = `${value}%`;
                const valueText = hpBar.querySelector(".Old-Param-Values");
                if (valueText) valueText.textContent = value;
            }
        },
        armour: (value) => {
            const armourBar = document.querySelector(".armour-bar");
            if (armourBar) {
                armourBar.style.width = `${value}%`;
                const valueText = armourBar.querySelector(".Old-Param-Values");
                if (valueText) valueText.textContent = value;
            }
        },
        hunger: (value) => {
            const hungerBar = document.querySelector(".hunger-bar");
            if (hungerBar) {
                hungerBar.style.width = `${value}%`;
                const valueText = hungerBar.querySelector(".Old-Param-Values");
                if (valueText) valueText.textContent = value;
            }
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
        greenZone: (isVisible) => {
            const greenZoneEl = document.querySelector(".Old-Fixed-ZZ");
            if (greenZoneEl) {
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
            }
        }, 100);
    }

    initializeHudProxy();
    createHud();
    // Принудительно показать элемент ZZ после создания HUD, если он существует
    const initialZZElement = document.querySelector(".Old-Fixed-ZZ");
    if (initialZZElement) {
        initialZZElement.style.display = "block"; // Устанавливаем display на block
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