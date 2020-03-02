const express = require('express');
const expressWs = require('express-ws');

let wss = expressWs(express());
let app = wss.app;

let DATA = {};

app.use(express.static("./public"));

app.ws("/ws", function(ws, req) {
    let ID;

    ws.on("message", function(msg) {
        let decoded = JSON.parse(msg);

        switch (decoded.type) {
            case 1:
                ID = decoded.id;
                DATA[ID] = {
                    location: decoded.location,
                    color: decoded.color
                };
        }
    });

    ws.on("close", function() {
        delete DATA[ID];
    });
    ws.on("error", function() {
        delete DATA[ID];
    });
});

setInterval(function() {
    wss.getWss().clients.forEach(function(client) {
        client.send(JSON.stringify(DATA));
    });
}, 15);

app.listen(8080, "localhost", () => console.log("Listening on localhost:8080..."));
