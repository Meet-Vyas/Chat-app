const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

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
var users = new Users();

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

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    // join a specific room
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    //socket.leave(params.room);

    // io.emit -> io.to(params.room).emit
    // socket.broadcast.emit -> socket.broadcast.to(params.room).emit
    // socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  // as in client side we have called the callback function here also we'll call it
  // here it is called in second argument only
  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    callback('');
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

// app.listen also calls for the same http.createServer();
server.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
