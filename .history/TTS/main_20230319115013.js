require('dotenv').config();

//twitch
const username = 'TWITCH_USERNAME';
const twtoken = 'TWITCH_TOKEN';
const 

const host = 'localhost';
const port = 8000;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/TTS', (req, res) => {
    res.sendFile(__dirname + '/tts.html');
});
io.on('connection', (socket) => {
  console.log('connected');
});
server.listen(port, () => {
  console.log(`listening on ${host}:${port}`);
});