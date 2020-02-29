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
const {
    User
} = require('./utils/user');
var Users = new User();
const PORT = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))
    // socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined chat room'));
    // when user join the room
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and Room Name are required');
        }
        socket.join(params.room);
        Users.removeUser(socket.id);
        Users.addUser(socket.id, params.name, params.room)
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
        io.to(params.room).emit('updateUserList', Users.getUserList(params.room));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has arrived`));
        callback();
    });
    // create new message
    socket.on('createMessage', (message, cb) => {
        var user = Users.getUser(socket.id);
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        cb();
    });
    // create new location message
    socket.on('createLocationMessage', (coords) => {
        var user = Users.getUser(socket.id);
        io.to(user.room).emit('newMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    })
    // disconnect user from
    socket.on('disconnect', function () {
        var user = Users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', Users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left /.`));
        }
    })
});

io.on('disconnect', (_socket) => {
    console.log('disconneted from server');
});



server.listen(PORT, () => {
    console.log(`server started in Port ${PORT}`);
})