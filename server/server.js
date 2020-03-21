const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
// app variable to configure express application
var app = express();
// console.log(__dirname + '/../public');
// console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () =>  {
  console.log(`Started on port ${port}`);
});
