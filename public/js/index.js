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
});

// front-end framework JQuery, React
// in real time u cannot pass the same event data at the same time using http API
// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });
