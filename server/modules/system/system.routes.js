var express = require('express')
var system = require('./system.controller.js')
var app = express()

app.get('/testing/', system.testing)
module.exports = app
