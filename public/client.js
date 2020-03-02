class Client {
    constructor(url = "//" + document.domain + ":" + location.port + "/ws") {
        if (url[0] !== "w") {
            if (location.protocol === "https") url = "wss:" + url;
            else url = "ws:" + url;
        }

        this.id = "";
        this.data = {};

        this.x = 250;
        this.y = 250;
        this.color = "#";

        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            for (let i = 0; i < 8; i++) this.id += possible.charAt(Math.random() * possible.length);
            for (let i = 0; i < 3; i++) this.color += (Math.floor(Math.random() * 255)).toString(16);
        };
        this.ws.onmessage = event => this.data = JSON.parse(event.data);
    }

    sendPlayerData() {
        if (this.ws.readyState !== 1) return;
        this.ws.send(JSON.stringify({
            type: 1,
            id: this.id,
            location: {
                x: this.x,
                y: this.y
            },
            color: this.color
        }));
    }

    getPlayers() {
        if (this.ws.readyState !== 1) return {};
        return this.data;
    }
}
