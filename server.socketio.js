var express = require('express')
var debug = require('debug')('meanstackjs:socketio')
var settings = require('./configs/settings.js').get()

function SocketIO (opts, done) {
  var self = this

  self.app = express()
  self.socketServer = require('http').createServer(self.app)
  self.io = require('socket.io')(self.socketServer)

  self.io.on('connection', function (socket) {
    socket.on('message', function (msg) {
      self.io.emit('message', msg)
    })
  })

  self.app.set('port', settings.socketio.port)
  self.socketServer.listen(self.app.get('port'))

  debug('Socketio listening on port %d', self.app.get('port'))
  console.log('Socketio listening on port %d', self.app.get('port'))
  done(null)
}

var run = require('./run.js')
if (!module.parent) {
  run(SocketIO)
}

module.exports = SocketIO
