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
            notificationElement.style.backgroundColor = '#000';
            notificationElement.style.color = '#fff';
            notificationElement.style.padding = '10px 15px';
            notificationElement.style.border = '1px solid #fff';
            notificationElement.style.zIndex = '10000';
            notificationElement.style.fontSize = '14px';
            notificationElement.style.fontFamily = 'Arial, sans-serif';
            notificationElement.style.minWidth = '200px';
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

    // --- Список иконок для всех 46 оружий ---
    const weaponIcons = {
        "0": "https://i.imgur.com/8XmGvYb.png",   // Fists
        "1": "https://i.imgur.com/7V9WzJc.png",   // Brass Knuckles
        "2": "https://i.imgur.com/3QeKtZq.png",   // Knife
        "3": "https://i.imgur.com/1rRlNfU.png",   // Nightstick
        "4": "https://i.imgur.com/4uLjKsF.png",   // Bat
        "5": "https://i.imgur.com/2pCkP7E.png",   // Shovel
        "6": "https://i.imgur.com/9aXwVhA.png",   // Pool Cue
        "7": "https://i.imgur.com/6bZxM5y.png",   // Katana
        "8": "https://i.imgur.com/5nTQoOv.png",   // Machete
        "9": "https://i.imgur.com/8XmGvYb.png",   // Baseball Bat
        "10": "https://i.imgur.com/7V9WzJc.png",  // Chainsaw
        "11": "https://i.imgur.com/3QeKtZq.png",  // Infrared Scope
        "12": "https://i.imgur.com/1rRlNfU.png",  // Camera
        "13": "https://i.imgur.com/4uLjKsF.png",  // Night Vision Goggles
        "14": "https://i.imgur.com/2pCkP7E.png",  // Grenade
        "15": "https://i.imgur.com/9aXwVhA.png",  // Tear Gas
        "16": "https://i.imgur.com/6bZxM5y.png",  // Molotov Cocktail
        "17": "https://i.imgur.com/5nTQoOv.png",  // Rocket Launcher
        "18": "https://i.imgur.com/8XmGvYb.png",  // Heat Seeking Rocket
        "19": "https://i.imgur.com/7V9WzJc.png",  // Flamethrower
        "20": "https://i.imgur.com/3QeKtZq.png",  // Minigun
        "21": "https://i.imgur.com/1rRlNfU.png",  // Satchel Charge
        "22": "https://i.imgur.com/4uLjKsF.png",  // Detonator
        "23": "https://i.imgur.com/2pCkP7E.png",  // Spray Paint
        "24": "https://i.imgur.com/9aXwVhA.png",  // Fire Extinguisher
        "25": "https://i.imgur.com/6bZxM5y.png",  // Parachute
        "26": "https://i.imgur.com/5nTQoOv.png",  // Pistol
        "27": "https://i.imgur.com/8XmGvYb.png",  // Silenced Pistol
        "28": "https://i.imgur.com/7V9WzJc.png",  // Desert Eagle
        "29": "https://i.imgur.com/3QeKtZq.png",  // Shotgun
        "30": "https://i.imgur.com/1rRlNfU.png",  // Sawed-Off Shotgun
        "31": "https://i.imgur.com/4uLjKsF.png",  // Combat Shotgun
        "32": "https://i.imgur.com/2pCkP7E.png",  // Uzi
        "33": "https://i.imgur.com/9aXwVhA.png",  // MP5
        "34": "https://i.imgur.com/6bZxM5y.png",  // AK-47
        "35": "https://i.imgur.com/5nTQoOv.png",  // M4
        "36": "https://i.imgur.com/8XmGvYb.png",  // Rifle
        "37": "https://i.imgur.com/7V9WzJc.png",  // Sniper Rifle
        "38": "https://i.imgur.com/3QeKtZq.png",  // PSG-1
        "39": "https://i.imgur.com/1rRlNfU.png",  // Croupier's Hammer
        "40": "https://i.imgur.com/4uLjKsF.png",  // Jetpack
        "41": "https://i.imgur.com/2pCkP7E.png",  // Vehicle Weapon
        "42": "https://i.imgur.com/9aXwVhA.png",  // Invisible Ped
        "43": "https://i.imgur.com/6bZxM5y.png",  // Remote Control Car
        "44": "https://i.imgur.com/5nTQoOv.png",  // Bomb
        "45": "https://i.imgur.com/8XmGvYb.png",  // Money
        "46": "https://i.imgur.com/7V9WzJc.png"   // Gold Bar
    };

    // --- Иконки для других элементов ---
    const icons = {
        health: "https://i.imgur.com/8XmGvYb.png",     // Кулак (для здоровья)
        armour: "https://i.imgur.com/7V9WzJc.png",     // Броня
        cash: "https://i.imgur.com/3QeKtZq.png",       // Деньги
        wanted: "https://i.imgur.com/1rRlNfU.png",      // Звезда розыска
        inactive_wanted: "https://i.imgur.com/4uLjKsF.png",
        zone: "https://i.imgur.com/2pCkP7E.png"         // Зона
    };

    function createHud() {
        hudStyleElement = document.createElement("style");
        hudStyleElement.id = "hudStyles";
        hudStyleElement.innerHTML = `
            /* Скрываем оригинальный HUD Radmir */
            .hud-radmir-info,
            .hud-radmir-wanted,
            .hud-radmir-radar__map,
            .hud-hassle-map .map-mask {
                display: none !important;
            }

            .GTA-SA-Hud {
                position: fixed;
                top: 10px;
                right: 10px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: white;
                pointer-events: none;
                z-index: 9999;
            }
            .GTA-SA-Hud.hidden { display: none; }
            .GTA-SA-Row {
                display: flex;
                align-items: center;
                margin: 2px 0;
            }
            .GTA-SA-Icon {
                width: 40px;
                height: 40px;
                margin-right: 8px;
                background: black;
                border: 2px solid white;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .GTA-SA-Icon img {
                max-width: 100%;
                max-height: 100%;
            }
            .GTA-SA-BarContainer {
                width: 120px;
                height: 8px;
                background: rgba(0,0,0,0.6);
                border: 1px solid white;
                margin: 0 8px;
            }
            .GTA-SA-BarFill {
                height: 100%;
                background: white;
            }
            .GTA-SA-HealthBar .GTA-SA-BarFill {
                background: red;
            }
            .GTA-SA-ArmourBar .GTA-SA-BarFill {
                background: blue;
            }
            .GTA-SA-Money {
                font-size: 24px;
                font-weight: bold;
                color: green;
                text-shadow: 2px 2px 0 black;
                margin-top: 5px;
            }
            .GTA-SA-Wanted {
                display: flex;
                gap: 2px;
                margin-top: 5px;
            }
            .GTA-SA-WantedStar {
                width: 12px;
                height: 12px;
                border: 1px solid white;
                background: transparent;
            }
            .GTA-SA-WantedStar.active {
                background: white;
            }
            .GTA-SA-Zone,
            .GTA-SA-Freeze {
                margin-top: 5px;
            }
        `;
        document.head.appendChild(hudStyleElement);

        const hudElement = document.createElement("div");
        hudElement.className = "GTA-SA-Hud";
        hudElement.innerHTML = `
            <div class="GTA-SA-Row">
                <div class="GTA-SA-Icon">
                    <img src="${icons.health}" alt="Health">
                </div>
                <div class="GTA-SA-BarContainer GTA-SA-HealthBar">
                    <div class="GTA-SA-BarFill" style="width:100%"></div>
                </div>
                <span class="GTA-SA-Value">100</span>
            </div>
            <div class="GTA-SA-Row">
                <div class="GTA-SA-Icon">
                    <img src="${icons.armour}" alt="Armour">
                </div>
                <div class="GTA-SA-BarContainer GTA-SA-ArmourBar">
                    <div class="GTA-SA-BarFill" style="width:100%"></div>
                </div>
                <span class="GTA-SA-Value">100</span>
            </div>
            <div class="GTA-SA-Money">$0000000</div>
            <div class="GTA-SA-Wanted">
                <span>WANTED:</span>
                <div class="GTA-SA-WantedStars">
                    <div class="GTA-SA-WantedStar"></div>
                    <div class="GTA-SA-WantedStar"></div>
                    <div class="GTA-SA-WantedStar"></div>
                    <div class="GTA-SA-WantedStar"></div>
                    <div class="GTA-SA-WantedStar"></div>
                    <div class="GTA-SA-WantedStar"></div>
                </div>
            </div>
            <div class="GTA-SA-Zone" style="display:none;">
                <span>ZONE ACTIVE</span>
            </div>
            <div class="GTA-SA-Freeze" style="display:none;">
                <span>FREEZE: <span class="GTA-SA-FreezeValue">100</span></span>
            </div>
        `;
        document.body.appendChild(hudElement);
    }

    function updateParam(className, value) {
        const row = document.querySelector(`.GTA-SA-${className}`);
        if (!row) return;
        const valueEl = row.querySelector('.GTA-SA-Value');
        const bar = row.querySelector('.GTA-SA-BarFill');
        if (valueEl) valueEl.textContent = value;
        if (bar) bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
    }

    function updateWanted(level) {
        const stars = document.querySelectorAll('.GTA-SA-WantedStar');
        stars.forEach((star, i) => {
            star.classList.toggle('active', i < level);
        });
    }

    const updateFunctions = {
        show: (value) => {
            const hud = document.querySelector('.GTA-SA-Hud');
            if (hud) hud.classList.toggle('hidden', +value < 1);
        },
        showBars: (value) => updateFunctions.show(value),
        weapon: (value) => {
            // Можно добавить отображение иконки оружия, если нужно
        },
        health: (value) => updateParam('HealthBar', value),
        armour: (value) => updateParam('ArmourBar', value),
        hunger: (value) => {}, // Не используется в этом стиле
        breath: (value) => {}, // Не используется в этом стиле
        bonus: () => {},
        server: () => {},
        money: (value) => {
            const el = document.querySelector('.GTA-SA-Money');
            if (el) el.textContent = `$${formatNumberWithDots(value)}`;
        },
        wanted: (value) => {
            updateWanted(value);
        },
        ammoInClip: (value) => {
            // Не показываем в этом стиле, можно добавить при необходимости
        },
        totalAmmo: (value) => {
            // Не показываем в этом стиле, можно добавить при необходимости
        },
        freeze: (value) => {
            const el = document.querySelector('.GTA-SA-FreezeValue');
            const container = document.querySelector('.GTA-SA-Freeze');
            if (container) {
                container.style.display = value > 0 ? 'block' : 'none';
                if (el) el.textContent = String(value).padStart(3, '0');
            }
        },
        greenZone: (isVisible) => {
            const el = document.querySelector('.GTA-SA-Zone');
            if (el) el.style.display = isVisible ? 'block' : 'none';
        }
    };

    function onInfoChange(type, value) {
        if (updateFunctions[type]) {
            updateFunctions[type](value);
        }
    }

    function initializeHudProxy() {
        const checkInterval = setInterval(() => {
            if (typeof window.interface === "function" && window.interface("Hud").info) {
                clearInterval(checkInterval);
                const hudInfo = window.interface("Hud").info;
                const clonedHudInfo = JSON.parse(JSON.stringify(hudInfo));
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

    createHud();
    initializeHudProxy();

    // Auto-cleanup (optional)
    setTimeout(() => {
        const hud = document.querySelector('.GTA-SA-Hud');
        if (hud) hud.remove();
        if (hudStyleElement && hudStyleElement.parentNode) hudStyleElement.parentNode.removeChild(hudStyleElement);
    }, 300000); // 5 minutes
}

AddHud();