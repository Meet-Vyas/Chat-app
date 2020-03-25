// A request from client to server to open the web socket and keep the connection open
// variable socket is used for communication purposes from client to server and vice-versa
var socket = io();

// first argument is the event-name and the next one will be callback function
// function is used instead of arrow functions because of errors in other browsers
socket.on('connect', function () {
  console.log('Connected to server');
});

// disconnect is a build-in event so write spelling carefully
socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (newMessage) {
  console.log('newMessage: ', newMessage);
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);

  jQuery('#messages').append(li);
});

// front-end framework JQuery, React
// in real time u cannot pass the same event data at the same time using http API
// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });

// in socket.emit third function is the callback function
// remember callbacks are required to be performed on both the server and the client side
// socket.emit('createMessage', {
//   from: 'Meet',
//   text: 'Hi'
// }, function(data) {
//   console.log('Got it', data);
// });

socket.on('newLocationMessage', function(locationMessage) {
  var li = jQuery('<li></li>');
  // target = _blank to open in a new tab
  var a = jQuery('<a target="_blank">My current location</a>');

  // editing seperately not inside the tags
  li.text(`${locationMessage.from}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
