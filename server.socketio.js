module.exports = SocketIO
/**
 * Mean Stack SocketIO Server File
 * @name SocketIO
 * @function
 * @param {Object} opts the options passed to create the server
 * @param {Function} done the callback function
 * MIT Licensed
*/

var express = require('express')
var debug = require('debug')('meanstackjs:socketio')
var fs = require('fs')
var settings = require('./configs/settings.js').get()
var glob = require('glob')

function SocketIO (opts, done) {
  var self = this
  self.logger = require('./server/logger.js').logger
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
      debug('Sockets: %s', socketFile)
      require('./' + socketFile)(self.io, socket)
    })
    socket.on('system', function (msg) {
      io.emit('system', msg)
    })
  })

  self.app.set('port', settings.socketio.port)
  self.socketServer.listen(self.app.get('port'))

  debug('Socketio listening on port %d', self.app.get('port'))
  self.logger.info('Socketio listening on port %d', self.app.get('port'))
  done(null)
}

var run = require('./run.js')
if (!module.parent) {
  run(SocketIO)
}
