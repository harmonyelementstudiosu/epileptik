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
            "active_wanted": "https://i.imgur.com/9ZQY7lW.png", // Пример иконки розыска (активная)
            "armour": "https://i.imgur.com/7Vt6zLk.png", // Пример иконки брони
            "breath": "https://i.imgur.com/8mNfXjK.png", // Пример иконки дыхания
            "cash": "https://i.imgur.com/1rOwRqJ.png", // Пример иконки денег
            "circle": "https://i.imgur.com/9ZQY7lW.png", // Иконка для круга (можно использовать ту же, что и для розыска)
            "health": "https://i.imgur.com/7Vt6zLk.png", // Пример иконки здоровья
            "hunger": "https://i.imgur.com/8mNfXjK.png", // Пример иконки голода
            "inactive_wanted": "https://i.imgur.com/9ZQY7lW.png", // Пример иконки розыска (неактивная)
            "wanted_back": "https://i.imgur.com/1rOwRqJ.png", // Фон для оружия
            "weapon_back": "https://i.imgur.com/1rOwRqJ.png", // Фон для оружия
            "zone": "https://i.imgur.com/7Vt6zLk.png" // Пример иконки зоны
        },
        weapon: {
            "0": "https://i.imgur.com/8mNfXjK.png", // Пример иконки пустого слота
            "1": "https://i.imgur.com/9ZQY7lW.png", // Пример иконки оружия 1
            "2": "https://i.imgur.com/7Vt6zLk.png", // Пример иконки оружия 2
            // ... Добавьте ссылки на иконки для всех остальных видов оружия
        },
        logo: {
            "1": "https://i.imgur.com/1rOwRqJ.png", // Пример логотипа сервера
            // ... Добавьте ссылки на другие логотипы
        },
    };

    function createHud() {
        hudStyleElement = document.createElement("style");
        hudStyleElement.id = "hudStyles";

        // Простой, плоский стиль, имитирующий GTA SA
        hudStyleElement.innerHTML = `
        /* Подгрузка шрифтов */
        @font-face{
            font-family:'GothamPro Black Italic';
            src:url('https://raw.githubusercontent.com/Fonts-Limit/Fonts/refs/heads/main/gothampro_blackitalic.ttf') format('truetype');
            font-weight:900;
            font-style:italic
        }

        /* Базовые стили для всего HUD */
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
        .Old-Fixed-HudBottom {
            z-index: -1;
            font-family: Arial, sans-serif; /* Простой шрифт */
            color: white; /* Основной цвет текста */
            font-weight: bold; /* Жирный шрифт для всех элементов */
        }

        /* Скрытие нативного HUD Radmir */
        #app .hud-radmir-wanted,
        #app .hud-radmir-info,
        .hud-hassle-map .map-mask {
            display: none !important;
        }

        /* Правая часть HUD (Top) */
        .Old-Fixed-HudTop {
            position: absolute;
            right: 10px;
            top: 10px;
            background-color: rgba(0, 0, 0, 0.7); /* Полупрозрачный черный фон */
            padding: 5px;
            border: 1px solid #ffffff; /* Тонкая белая рамка */
            border-radius: 0; /* Без скруглений */
        }

        /* Логотип */
        .Old-Fixed-Logo img {
            width: 150px; /* Примерная ширина */
            height: auto;
            margin-bottom: 5px;
        }

        .Old-Fixed-Bonus {
            background-color: #ff0000; /* Красный фон */
            color: white;
            font-weight: bold;
            font-size: 12px;
            padding: 2px 5px;
            border: 1px solid #ffffff;
            border-radius: 0;
            font-family: 'GothamPro Black Italic'; /* Шрифт для бонуса */
            font-style: italic;
        }

        /* Основные параметры (Здоровье, Броня и т.д.) */
        .Old-Fixed-Params {
            display: flex;
            flex-direction: column;
            gap: 5px; /* Отступ между параметрами */
        }

        .Old-Fixed-Param {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .old-param__icon {
            width: 16px;
            height: 16px;
        }

        .Old-Progress__Values {
            width: 100px; /* Ширина полосы */
            height: 8px;
            background-color: #333333; /* Темный фон полосы */
            border: 1px solid #ffffff;
            overflow: hidden;
        }

        .Old-Progress__Values div {
            height: 100%;
            background-color: #ff0000; /* Цвет заполнения (здоровье) */
        }

        .Old-Param-Values {
            font-size: 12px;
            font-weight: bold;
        }

        /* Деньги */
        .Old-Fixed-Cash {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        }

        .Old-Fixed-Cash img {
            width: 16px;
            height: 16px;
        }

        .Old-Fixed-Cash span {
            font-size: 14px;
            font-weight: bold;
        }

        /* Оружие */
        .Old-Fixed-Weapon {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        }

        .Old-Fixed-Weapon_icon {
            width: 32px;
            height: 32px;
        }

        .Old-Fixed-Weapon_ammo {
            display: flex;
            align-items: center;
            gap: 2px;
        }

        .Ammo-in-clip,
        .Ammo-full {
            font-size: 12px;
            font-weight: bold;
        }

        /* Розыск */
        .Old-Fixed-Wanted {
            display: flex;
            align-items: center;
            gap: 2px;
            margin-top: 10px;
        }

        .Wanted_row img {
            width: 16px;
            height: 16px;
        }

        /* Нижняя часть HUD (Freeze, Zone) */
        .Old-Fixed-HudBottom {
            position: absolute;
            right: 10px;
            bottom: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 5px;
            border: 1px solid #ffffff;
            border-radius: 0;
        }

        .Old-Fixed-ZZ {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-bottom: 5px;
        }

        .Old-Fixed-ZZ_icon {
            width: 16px;
            height: 16px;
        }

        .Old-Fixed-Freeze {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .Old-Fixed-Freeze_text {
            font-size: 12px;
            font-weight: bold;
        }

        .Old-Fixed-Freeze_value {
            font-size: 12px;
            font-weight: bold;
        }

        /* Стили для окон (пример для одного типа окна, нужно повторить для всех) */
        body .window-bg,
        body .window__before {
            background-image: none;
        }

        body .window__title {
            text-align: center;
            color: white;
            background-color: #333333;
            padding: 5px;
            border-bottom: 1px solid #ffffff;
            font-weight: bold; /* Жирный шрифт для заголовков */
        }

        body .window-table__item {
            color: white;
            background-color: #222222;
            border: 1px solid #ffffff;
            padding: 5px;
            margin: 2px 0;
            border-radius: 0;
            font-weight: bold; /* Жирный шрифт для элементов таблицы */
        }

        body .window-table__item.selected {
            background-color: #444444;
            color: #ffff00; /* Желтый для выделенного */
        }

        body .window-button {
            background-color: #333333;
            color: white;
            border: 1px solid #ffffff;
            padding: 5px 10px;
            margin: 5px;
            cursor: pointer;
            border-radius: 0;
            font-weight: bold; /* Жирный шрифт для кнопок */
        }

        body .window-button:hover {
            background-color: #555555;
        }

        /* Для инвентаря (если нужно оставить его стилизацию) */
        /* Можно оставить его как есть или тоже упростить */

        /* Радиальное меню (оставляем как есть, согласно вашему запросу) */
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

        /* ВАЖНО: Этот код является лишь отправной точкой. Вам нужно будет вручную прописать стили для каждого типа окна, чтобы они соответствовали GTA SA. */

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
                <div class="Old-Fixed-Cash"><img src="${oldRadmirConfig.icons.cash}"><span>0</span></div>
                <div class="Old-Fixed-Params__all">
                  <div class="Old-Fixed-Param health">
                    <img src="${oldRadmirConfig.icons.health}" class="old-param__icon">
                    <div class="Old-Param-Progress">
                      <div class="Old-Progress__Values" style="width:100%"><div style="width:100%;"></div></div>
                    </div>
                    <span class="Old-Param-Values">100</span>
                  </div>
                  <div class="Old-Fixed-Param armour">
                    <img src="${oldRadmirConfig.icons.armour}" class="old-param__icon">
                    <div class="Old-Param-Progress">
                      <div class="Old-Progress__Values" style="width:100%"><div style="width:100%;"></div></div>
                    </div>
                    <span class="Old-Param-Values">100</span>
                  </div>
                  <div class="Old-Fixed-Param hunger">
                    <img src="${oldRadmirConfig.icons.hunger}" class="old-param__icon">
                    <div class="Old-Param-Progress">
                      <div class="Old-Progress__Values" style="width:100%"><div style="width:100%;"></div></div>
                    </div>
                    <span class="Old-Param-Values">100</span>
                  </div>
                  <div class="Old-Fixed-Param breath">
                    <img src="${oldRadmirConfig.icons.breath}" class="old-param__icon">
                    <div class="Old-Param-Progress">
                      <div class="Old-Progress__Values" style="width:100%"><div style="width:100%;"></div></div>
                    </div>
                    <span class="Old-Param-Values">100</span>
                  </div>
                </div>
              </div>
              <div class="Old-Fixed-Weapon">
                <img src="${oldRadmirConfig.weapon[0]}" class="Old-Fixed-Weapon_icon">
                <div class="Old-Fixed-Weapon_ammo"><span class="Ammo-in-clip">1</span><span class="Ammo-full">1</span></div>
              </div>
            </div>
            <div class="Old-Fixed-Wanted">
              <div class="Wanted_row"><img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.inactive_wanted}" class="wanted-innactive"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"> <img src="${oldRadmirConfig.icons.active_wanted}" class="wanted-active"></div>
            </div>
          </div>
          <div class="Old-Fixed-HudBottom">
            <!-- Элемент ZZ -->
            <div class="Old-Fixed-ZZ"><img src="${oldRadmirConfig.icons.zone}" class="Old-Fixed-ZZ_icon"> <span class="Old-Fixed-ZZ_text">GREEN ZONE</span></div>
            <div class="Old-Fixed-Freeze">
              <span class="Old-Fixed-Freeze_text">Freeze:</span>
              <span class="Old-Fixed-Freeze_value">100</span>
            </div>
          </div>
        </div>
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
            const progressBar = paramElement.querySelector(".Old-Progress__Values > div");
            const valueText = paramElement.querySelector(".Old-Param-Values");
            if (progressBar) {
                progressBar.style.width = `${value}%`;
            }
            if (valueText) {
                valueText.textContent = value;
            }
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
    const initialZZElement = document.querySelector(".Old-Fixed-ZZ");
    if (initialZZElement) {
        initialZZElement.style.display = "block";
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