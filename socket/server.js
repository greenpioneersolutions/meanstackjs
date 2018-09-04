module.exports = SocketIO

const express = require('express')
const fs = require('fs')
const glob = require('glob')
const settings = require('../configs/settings.js').get()

function SocketIO (opts, done) {
  var self = this
  self.logger = require('../server/logger.js').logger
  self.app = express()
  if (settings.https.active) {
    self.socketServer = require('https').createServer({
      key: fs.readFileSync(settings.https.key),
      cert: fs.readFileSync(settings.https.cert)
    }, self.app)
  } else {
    self.socketServer = require('http').createServer(self.app)
  }
  self.io = require('socket.io')(self.socketServer)
  self.io.on('connection', function (socket) {
    var files = glob.sync('server/modules/**/*.socket.js')
    files.forEach(function (socketFile) {
      require('./' + socketFile)(self.io, socket)
    })
    socket.on('system', function (msg) {
      self.io.emit('system', msg)
    })
  })
  self.io.listen(settings.port.socket)
  self.logger.info('Socketio listening on port ' + settings.port.socket)
  done(null)
}

if (!module.parent) {
  require('./run.js')(SocketIO)
}
