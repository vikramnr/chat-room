const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socket(server);

const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (_socket) => {
    // console.log(socket);
    console.log('new user connect');
});

io.on('disconnect', (_socket) => {
    console.log('disconneted from server');
});

server.listen(PORT, () => {
    console.log(`server started in Port ${PORT}`);
})