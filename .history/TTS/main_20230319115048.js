require('dotenv').config();

//twitch
const twUsername = 'TWITCH_USERNAME';
const twToken = 'TWITCH_TOKEN';
const twChannel = ['TWITCH_CHANNEL']

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