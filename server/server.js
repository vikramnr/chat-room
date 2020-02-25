const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
const app = express();
var server = http.createServer(app);
var io = socket(server);
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const {
    isRealString
} = require('./utils/validation');


const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined chat room'));
    // when user join the room
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room Name are required');
        }
        callback();
    });
    socket.on('createMessage', (message, cb) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        cb();
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })
});

io.on('disconnect', (_socket) => {
    console.log('disconneted from server');
});



server.listen(PORT, () => {
    console.log(`server started in Port ${PORT}`);
})