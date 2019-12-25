var socket = io();
socket.on('connect', () => {
    console.log('user connected');
    socket.on('newMessage', (message) => {
        console.log(message);
        //var textnode = document.createTextNode();
        let parent = document.createElement("div")
        parent.append(`${message.from}: ${message.text}`)
        document.getElementById('text').appendChild(parent)
        // = message.text + ' from ' + message.from;
    });
});

socket.on('disconnect', () => {
    console.log('disconneted from server');
})
const send = document.getElementById('send');
send.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Andrew',
        text: document.getElementById('message').value
    }, function (data) {
        console.log('hi got it', data);
    });
});