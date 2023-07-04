class AuthenticationModule {

    setSendheapCookies = () => {
        let url = new URL(window.location.href);
        let utm_source = url.searchParams.get("utm_source");
        let utm_campaign = url.searchParams.get("utm_campaign");
        let token = url.searchParams.get("sh_token");

        if (utm_source === 'sendheap') {
            if (utm_campaign && sh_token) {
                let date = new Date();
                date.setDate(date.getDate() + 1);
                expires = "; expires=" + date.toUTCString();
                document.cookie = "sh_event_code=" + utm_campaign + expires
                document.cookie = "sh_token=" + sh_token + expires
            }
        }
    }

    setSendheapEvent = (event) => {
        let sh_event_code = getCookie("sh_event_code");
        let sh_token = getCookie("sh_token");

        if (sh_event_code && sh_token) {
            let sh_event = {
                "event_code": sh_event_code,
                "token": sh_token,
                "event_data": event
            }
            sendheapEvent(sh_event);
        }
    }

    getCookie = (name) => {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    sendheapEvent = (event) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.sendheap.com/api/event/trigger/" , true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(event));
    }



}