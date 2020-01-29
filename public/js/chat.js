var socket = io();
// btn for sharing message
const send = document.getElementById('send');
// scroll function
function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
     }
  
}
// btn for sharing location
const shareLocation = document.getElementById('send-location');
// 
const message = document.getElementById('message');
// template for message
const messageTemplate = document.getElementById('message-template').textContent;
// template for location
const locationTemplate = document.getElementById('location-message-template').textContent;
// DOM where text is getting attached
const text = document.getElementById('messages');

// connect user and updates message to screen
socket.on('connect', () => {
    console.log('user connected');
    socket.on('newMessage', (message) => {
        console.log(message);
        // new if..else case for checking if we have location or text
        let parent;
        if (message.text) {
            // parent = document.createElement("div")
            // parent.append(`${moment(message.CreatedAt).format('h:mm a')} ${message.from}: ${message.text}`)
            // document.getElementById('text').innerHTML = html
            // document.getElementById('text').appendChild
            let formattedTime = moment(message.CreatedAt).format('h:mm a');
            let html = Mustache.render(messageTemplate, {
                text: message.text,
                from: message.from,
                createdAt: formattedTime
            });
            let temp = document.createElement('div');
            temp.innerHTML = html;
            console.log(text);
            text.appendChild(temp);
            scrollToBottom();
        } else {
            let formattedTime = moment(message.CreatedAt).format('h:mm a');
            let html = Mustache.render(locationTemplate, {
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            });
            let temp = document.createElement('div');
            temp.innerHTML = html;
            text.appendChild(temp);
            scrollToBottom();
            // parent = document.createElement("a")
            // parent.href = `${message.url}`;
            // parent.target = `_blank`
            // span = document.createElement('span')
            // span.append(`${moment(message.CreatedAt).format('h:mm a')} ${message.from}: `)
            // parent.innerHTML = "View Location";
            // span.append(parent)
            // document.getElementById('text').innerHTML = html
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
        text: message.value
    }, function (data) {
        message.value = ''
    });
});
// Location sharing API from DOM // MDN Docs
shareLocation.addEventListener('click', (e) => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    shareLocation.disabled = true;
    message.value = 'Fetching location...'

    function success(pos) {
        var crd = pos.coords;
        socket.emit('createLocationMessage', {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
        shareLocation.disabled = false;
        message.value = ''
    }

    function error(err) {
        alert('Unable to fetch location')
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
})