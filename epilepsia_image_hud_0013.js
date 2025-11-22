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

    const hudScript = document.currentScript;
    const hudElements = [];
    const oldRadmirConfig = {
        icons: {
        "active_wanted": "",
        "armour": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABXUlEQVR4nO2UO0sDQRSFvxsfMUFB0UIQwUclaJneQiytFP+Flv4JbfwDNoJ/QkS0TycBQbGJlWB8iyYeuTCBcd3sGrDMgYE5e+6cPdx5QA95kLQm6TGM/YS2G2kbaev7M7zLwEiYTyS08UgbTltcyDC+jeb1LrRc4+VoXklolQ51nSGpIOlYv3EtqSrpKkU7l1SMfSzFuA9o0j3KZvaWt3l1YCriNWAv4tvAUsTvPFNs0Mm4lOBDwHSC/0ibu3lm1gIawGf0uRV4ezhvw9vWMLP3zMSSPI0f+oGgnwCDiVTFYL4CvPpcUimvxzXgHngE1sNCN3qOavxHbnIBHIYLNAbMZRnPhOFYBB5CT5N9fwIWgNUUj1TjA+DGE5rZqaTJcNOqUc2mpzOzM0lbwCgwm3mOHeFh8eJ5YIfO8CN46enN7Ogvxk3AL4rjBfiKOGHjLPEAFc3sIyNED/wvvgE3vqIBaRUu4wAAAABJRU5ErkJggg==",
        "breath": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGjmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgMTE2LmRlZTNhNzcsIDIwMjIvMDkvMDEtMTM6NTc6MDggICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjUtMTEtMjJUMjA6NDc6MjIrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI1LTExLTIyVDIzOjQ0KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTExLTIyVDIzOjQ0KzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MTgwYmU0NC04Y2ZlLThlNDYtOWY2MC0xYzhiYzk2Y2IzNjciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplMWRjZjgwZi1mZTAwLWIyNGEtOWI3NC1iYjg3YjdkYTFhODYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNGFhMDcwZC01NTUyLWNlNDktOTk5MC05YzRiOWZjNzBlN2EiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ0YWEwNzBkLTU1NTItY2U0OS05OTkwLTljNGI5ZmM3MGU3YSIgc3RFdnQ6d2hlbj0iMjAyNS0xMS0yMlQyMDo0NzoyMiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZjM1ODVlNS01ODA3LTcyNGMtYmVlMS1kZTIxZWMzMDBmMDQiIHN0RXZ0OndoZW49IjIwMjUtMTEtMjJUMjM6Mzk6NDUrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTE4MGJlNDQtOGNmZS04ZTQ2LTlmNjAtMWM4YmM5NmNiMzY3IiBzdEV2dDp3aGVuPSIyMDI1LTExLTIyVDIzOjQ0KzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuNSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Cqzd6wAAAYJJREFUOI211T1rFUEYBeBnrwYRJYLYKBbBLlgIgnZaJI0gWImWNoooiphOsEqj6az9+A+C/gTByiIRGwsRgog2EZRoo8di5+py2d2bezUHhtl9553DmTNn2SqJ7cBgzPoBrGAN7/ACV7fEnKRrHE7yKe142rNPkl7iV4VkM8lSkotJHjTIl6chXmgQzI+s3S3170lmJiWeS7JaFLatD3G8i3hnh/Xvcaxjbbbx/K3r7salog1PyvwBb7uahooXcHoM4SzOYL68L/V2j3i2VdzoS0TT45tYxC+kjB/4iQoz+IpVPMP6mNOpsk2fdFcqFrGMvWrV1Mp3tPQOsImXeIzX6MzxyhS+D3EpSa8V57G7obbrdLAH1/xNTPU/Pa7U2T7YJL6PEx0bgs+4ji+lNlAnaBRX8BDVJDk+WnpvJVlPcqHlbm6X3j8en8SpoqKppMIuvMHzUnuEy0X9EWyU+n71z2CfKT0+pPZSEXGvCLhTZk0rJh1nix2j+Jjk3Li4/RN+AwNDlBm2QhoFAAAAAElFTkSuQmCC",
        "cash": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgMTE2LmRlZTNhNzcsIDIwMjIvMDkvMDEtMTM6NTc6MDggICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjUtMTEtMjJUMjA6NDc6MjIrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI1LTExLTIyVDIzOjM5OjQ1KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI1LTExLTIyVDIzOjM5OjQ1KzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiZjM1ODVlNS01ODA3LTcyNGMtYmVlMS1kZTIxZWMzMDBmMDQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0NWEwOTNiYS1lNTk2LTliNGItOGEzMS1mOGRlNTI2MzY0NzYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNGFhMDcwZC01NTUyLWNlNDktOTk5MC05YzRiOWZjNzBlN2EiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ0YWEwNzBkLTU1NTItY2U0OS05OTkwLTljNGI5ZmM3MGU3YSIgc3RFdnQ6d2hlbj0iMjAyNS0xMS0yMlQyMDo0NzoyMiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiZjM1ODVlNS01ODA3LTcyNGMtYmVlMS1kZTIxZWMzMDBmMDQiIHN0RXZ0OndoZW49IjIwMjUtMTEtMjJUMjM6Mzk6NDUrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4djmbFAAACJElEQVQ4ja3UT6hWZRAG8N/3x/QWKBhoiG7CykUErXShiQsFdRFiEQRuglYtFFvkIohWgghuQgh0E1wRJdzYzT/kShCTXKRgghYlZrWTMqHsPi7e+bynaxu/7sCcF+bMmXnmOc+8vSR99Dxu//xH7BmswW1814l3a6Q9k36SebN8kESS+UkWJtmfZFWSnWn2R5JPkmytvJEPkzyVpN8rxP1O9+nyPfi7Yh9gMybx0qwpvsJxHMVdDJER4mHHJVlWyHYlOZfk4ySbMmO/JHk9yZYk9yp2Lcm7NW2vW7g70sYkD5KsSfJFktVJLic5n+TlWblHOg1/S7IiySPSH9RYT9e5FKdr7LtYiFfxPn7ABmys3LMdWq7gV8XHNCaKxy24hku4gHW4iIM4g+9xA89VoUnsqO/eqLy/MBiWPN7BR7iObwvFn1iGn7ES+7AcJzS5DbACz+JDnMLnFddLMur8dqG7gMXVMDXVnYotxk0zGl+A53EPX+NYNe2PfsCnmRubStPxI/1OmxvbXLQZ/s9CJ/GNturzcUtTzb827kntPeyuoku0n7wI6xkf8WeY0rQeTetvFeqjOD1u4Sm8hhc1Xk/hfr0LMi4V2zXNXimEVzXpqbM3LuI3cRnbNAoW4TDm4XwX8TgN9uKQtt4TeKUKX4LRgkzO0YL8nuSF7oJMjcfIY/YlfqRRMNDuigms1a7RJ9nEXtX5CQfU7dZLMjRzH8+FDZCHa3rpv8at4mYAAAAASUVORK5CYII=",
        "circle": "",
        "health": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABE0lEQVR4nO2QvUoDQRRGz6iFhVFUAoqNWPgg+iaW4jMEBCux8QUELRQDQX0Co/iDYGtno1iISgpJodWRlUkIY7IJphAkp1n2++6enbkw4E9QF9Sy+qa+qnvqVOzG1R31JfYVdbEX6Zxa9yd3mUC9bdN9qPPdxId25jOnO2n1hDbid6Dwiw3WQwjN74baDBSS93WgnGTHQCnJxnJ/q56rj+qDeh2zYnLt732ql3Eum7/qtooJYAl4BmrAGlAFZrMaGAaegGVgG5gGZoCzEEKt26n348lq8XmT9NWkr+QKG6iT6n1y/S31SN1M8mwNRXpFHVFPzedCHe1Z2oq620F6QL+opUS60be0gboS97naDAf8T74A7kWawoV1R8gAAAAASUVORK5CYII=",
        "hunger": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABEklEQVR4nO2TsS5EURRF1zXIDEIIGYlidHoRiU4kWlFpiX9QqHQ+QKdQaCjnCxRaCX+hUIiMRkzIkscZXkHe5D3lrOLenX1zdk5OzoUB/aCeqzvqobqlnqqb8bav3v5VO1SQvQG0gEWgCaxH6AJwBiyXDZ4EOsA98AR0gTqwG++dKsHjwGjoaWAJGCuqH6aYIyABb8AM8AjUioqKOj4BpqLbLDSjDcxTFfXCL17U1fDa4T2X7Tjj6vOEbkrpJvQ7BfQT3Iq7oc6G7s24ViW4HvdIbAcxc3LbUWorGr/oA2AOeP2Pjr91SukOWAP2KIt66Q8rOb+bGVU6buZ0b8bE9y6Puq0+qNfqRM4/zvxK4QOowgdAAnu6/wOzwAAAAABJRU5ErkJggg==",
        "inactive_wanted": "",
        "wanted_back": "",
        "weapon_back": "",
        "zone": "" // Убедитесь, что тут правильный путь к изображению
    },
    weapon: {
        "0": "data:image/png;base64,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",
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
       text-shadow:0 0 .46vh #00000080
      }
      .Old-Fixed-Cash img{
       margin-right: 13px;
       margin-top: 1px
      }
      .Old-Fixed-Params__all{
       margin-top:1vh
      }
      .Old-Fixed-Param{
       display:flex;
       align-items:center;
       margin-top:.95vh
      }
      .Old-Fixed-Param.health{
        margin-top:0;
        margin-left:1.45vh;
      }
      .Old-Fixed-Param.armour,.Old-Param-Values{
       margin-left:.93vh;
      }
      .Old-Fixed-Param.breath{
       margin-left: 3px
      }
      .Old-Fixed-Param.hunger{
       margin-left: .09vh
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

/* Стили для текстовых параметров над радаром */
.hud-params-above-radar {
    position: absolute;
    left: calc(7.2vh + 10px); /* Центрируем по левому краю радара + небольшой отступ */
    top: calc(100vh - 20.9vh - 154px); /* Высота по верхней грани радара, минус 150 пикселей (254 - 100) */
    display: flex;
    flex-direction: row; /* Горизонтальное расположение */
    gap: 20px; /* Расстояние между элементами */
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.7); /* Темный полупрозрачный фон */
    padding: 10px 15px;
    border-radius: 8px;
    font-family: "GothamPro Regular", Arial, sans-serif;
    font-size: 14px;
    color: white;
}

.hud-param-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.hud-param-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
}

.hud-param-value {
    font-family: "GothamPro Bold", Arial, sans-serif;
    font-weight: bold;
    min-width: 40px; /* Для выравнивания значений */
    text-align: right;
}
  `;
      document.head.appendChild(hudStyleElement);
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
                 <!-- Пустой блок для параметров, так как они перемещены над радаром -->
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

      <!-- Блок текстовых параметров над радаром -->
      <div class="hud-params-above-radar">
          <div class="hud-param-row">
             <img src="${oldRadmirConfig.icons.health}" class="hud-param-icon">
             <span class="hud-param-value">100</span>
          </div>
          <div class="hud-param-row">
             <img src="${oldRadmirConfig.icons.armour}" class="hud-param-icon">
             <span class="hud-param-value">100</span>
          </div>
          <div class="hud-param-row">
             <img src="${oldRadmirConfig.icons.hunger}" class="hud-param-icon">
             <span class="hud-param-value">100</span>
          </div>
          <div class="hud-param-row">
             <img src="${oldRadmirConfig.icons.breath}" class="hud-param-icon">
             <span class="hud-param-value">100</span>
          </div>
          <div class="hud-param-row">
             <img src="${oldRadmirConfig.icons.cash}" class="hud-param-icon">
             <span class="hud-param-value">0</span>
          </div>
      </div>
      `;
      document.body.appendChild(hudElement);
      hudElements.push(OldHudContainer);
    }
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
            updateParamText("health", value);
        },
        armour: (value) => {
            updateParamText("armour", value);
        },
        hunger: (value) => {
            updateParamText("hunger", value);
        },
        breath: (value) => {
            updateParamText("breath", value);
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
            updateParamText("money", value);
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
    function updateParamText(paramClass, value) {
        // Находим элемент по названию параметра
        let selector;
        switch(paramClass) {
            case 'health':
                selector = '.hud-params-above-radar .hud-param-row:nth-child(1) .hud-param-value';
                break;
            case 'armour':
                selector = '.hud-params-above-radar .hud-param-row:nth-child(2) .hud-param-value';
                break;
            case 'hunger':
                selector = '.hud-params-above-radar .hud-param-row:nth-child(3) .hud-param-value';
                break;
            case 'breath':
                selector = '.hud-params-above-radar .hud-param-row:nth-child(4) .hud-param-value';
                break;
            case 'money':
                selector = '.hud-params-above-radar .hud-param-row:nth-child(5) .hud-param-value';
                break;
            default:
                return;
        }
        const valueText = document.querySelector(selector);
        if (valueText) {
            if (paramClass === 'money') {
                valueText.textContent = formatNumberWithDots(value);
            } else {
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
  };
AddHud();