const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socket(server);
var {
    generateMessage
} = require('./utils/message');

const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('admin', 'Welcome to chat app'))
    socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined chat room'));
    socket.on('createMessage', (message, cb) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        cb('hello ack.,');
    });
});

io.on('disconnect', (_socket) => {
    console.log('disconneted from server');
});



server.listen(PORT, () => {
    console.log(`server started in Port ${PORT}`);
})