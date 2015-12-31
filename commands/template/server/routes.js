var express = require('express')
var __name__ = require('./__name__.controller.js')
var app = express()

app.get('/__name__/', __name__.__name__)
module.exports = app
