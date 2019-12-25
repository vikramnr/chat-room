var socket = io();
socket.on('connect', () => {
    console.log('user connected');
    socket.on('newMessage', (message) => {
        console.log(message);
        document.getElementById('text').textContent = message.text + ' from ' + message.from;
    });
});

socket.on('disconnect', () => {
    console.log('disconneted from server');
})
// const send = document.getElementById('send');
// send.addEventListener('click', (e) => {
//     socket.emit('createMessage', {
//         from: 'Andrew',
//         text: document.getElementById('message').value
//     });
// });