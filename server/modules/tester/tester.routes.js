var express = require('express')
var tester = require('./tester.controller.js')
var app = express()

app.get('/tester/', tester.tester)
module.exports = app
