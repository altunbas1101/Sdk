(function (global) {
    global.SH = {
        version: '1.0.0',
        set_token: (token) => {
            let url = new URL(window.location.href);
            let utm_source = url.searchParams.get("utm_source");
            let utm_campaign = url.searchParams.get("utm_campaign");
            let token = url.searchParams.get("token");
            if (utm_source === "sendheap") {
                if (utm_campaign && sh_token) {
                    let date = new Date();
                    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
                    let expires = `; expires=${date.toUTCString()}`;
                    document.cookie = "sh_event_code=" + utm_campaign + expires + "; path=/";
                    document.cookie = `sh_token=${token}${expires}; path=/`;
                }
            }
        },
        get_token: () => {
            let token = global.SH.helper.getCookie('sh_token') ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaW5rX2lkIjoiMSIsImFjdGlvbl9pZCI6IjEiLCJtZW1iZXJfaWQiOjEsInVzZXJfaWQiOjF9.YtjBAORu2r8-fuq0PLr9ZW2mqujiUd4cpCOWBUGupq4';
            if (token) {
                return token;
            }
            return false;
        },
        get_event_code: () => {
            let event_code = global.SH.helper.getCookie('sh_event_code');
            if (event_code) {
                return event_code;
            }
            return false;
        },
        get_product_code: () => {
            let product_code = global.SH.helper.getCookie('sh_product_code') ?? PRODUCT_DATA[0].code
            if (product_code) {
                return product_code;
            }
            return false;
        },
        get_order_code: () => {
            let order_code = global.SH.helper.getCookie('sh_order_code');
            if (order_code) {
                return order_code;
            }
            return false;
        },
        set_product_code: (product_code) => {
            let date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            let expires = `; expires=${date.toUTCString()}`;
            document.cookie = `sh_product_code=${product_code}${expires}; path=/`;
        },
        set_order_code: (order_code) => {
            let order_code = ""
            if(typeof data !== "undefined"){
                order_code = data.orderData ? JSON.parse(data.orderData).transaction : ""
            }
            let date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            let expires = `; expires=${date.toUTCString()}`;
            document.cookie = `sh_order_code=${order_code}${expires}; path=/`;
        },
        event: (event_code, data) => {
            fetch(`http://localhost:8083/api/event/trigger/${event_code}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    sh_token: global.SH.helper.getCookie('sh_token'),
                    product_code: data,
                    order_code: data,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        //
    }
    return global
})(this)