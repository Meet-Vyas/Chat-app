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

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

// app.listen also calls for the same http.createServer();
server.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
