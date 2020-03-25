const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 1998;
// app variable to configure express application
var app = express();

// console.log(__dirname + '/../public');
// console.log(publicPath);

// req - request
// res - response
// var server = http.createServer((req, res) => {
// this works similar to code written below
// });
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // there can be 0 second argument but 2nd argument will send the data to the client
  // socket.emit('newEmail', {
  //   from: 'meet@email.com',
  //   text: 'Hey. What is going on',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail: ', newEmail);
  // });

  // as in client side we have called the callback function here also we'll call it
  // here it is called in second argument only
  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// app.listen also calls for the same http.createServer();
server.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
