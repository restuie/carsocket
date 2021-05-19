const express = require('express');
const WebSocket = require('ws');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('open', function open() {
    console.log('connected');
});

wss.on('close', function close() {
    console.log('disconnected');
});
wss.on('connection',function connection(ws,req){
    ws.send('welcome')
    ws.on('message',function incoming(message){
        console.log('123')
        wss.clients.forEach(function each(client){
            if(client.readyState == WebSocket.OPEN){
                client.send(message)
            }            
        })
    })
})
