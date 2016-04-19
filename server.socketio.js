module.exports = SocketIO

var express = require('express')
var debug = require('debug')('meanstackjs:socketio')

function SocketIO (opts, done) {
  var app = express()
  var socketServer = require('http').createServer(app)
  var io = require('socket.io')(socketServer)
  io.on('connection', function (socket) {
    socket.on('message', function (msg) {
      io.emit('message', msg)
    })
  })
  socketServer.listen(8282)
  debug('socketio listening 8282')
  done(null)
}

var run = require('./run.js')
if (!module.parent) {
  run(SocketIO)
}
