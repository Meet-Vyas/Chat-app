const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // there can be 0 second argument but 2nd argument will send the data to the client
  // socket.emit('newEmail', {
  //   from: 'meet@email.com',
  //   text: 'Hey. What is going on',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail: ', newEmail);
  // });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// app.listen also calls for the same http.createServer();
server.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
