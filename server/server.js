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

  // there can be 0 second argument but 2nd argument will send the data to the client
  // socket.emit('newEmail', {
  //   from: 'meet@email.com',
  //   text: 'Hey. What is going on',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail: ', newEmail);
  // });

  socket.emit('newMessage', {
    from: 'Server',
    text: 'Hi',
    createdAt: 123123
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// app.listen also calls for the same http.createServer();
server.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
