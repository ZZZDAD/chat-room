var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var user = require('./routes/user');
var chat = require('./routes/chat');

var app = express()

const corsOptions = {
  "origin": "*",
  "methods": "GET, POST",
  "credentials": true
}

app.use(cors(corsOptions)); // 跨域
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', user);
app.use('/chat', chat);

module.exports = app;
