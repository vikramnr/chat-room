var socket = io();
const send = document.getElementById('send');
const shareLocation = document.getElementById('location');
// connect user and updates message to screen
socket.on('connect', () => {
    console.log('user connected');
    socket.on('newMessage', (message) => {
        console.log(message);
        // new if..else case for checking if we have location or text
        let parent;
        if (message.text) {
            parent = document.createElement("div")
            parent.append(`${message.from}: ${message.text}`)
            document.getElementById('text').appendChild(parent)
        } else {
            parent = document.createElement("a")
            parent.href = `${message.url}`;
            parent.target = `_blank`
            span = document.createElement('span')
            span.append(`${message.from}: `)
            parent.innerHTML = "View Location"; 
            span.append(parent)
            document.getElementById('text').appendChild(span)
        }
    });
});

socket.on('disconnect', () => {
    console.log('disconneted from server');
})
// sends messages to other users
send.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Andrew',
        text: document.getElementById('message').value
    }, function (data) {
        console.log('hi got it', data);
    });
});

shareLocation.addEventListener('click', (e) => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
})