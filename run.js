var Mean = require('./server.mean.js')
var SocketIO = require('./server.socketio.js')
var mail = require('./server/mail.js')
var environment = require('./configs/environment.js').get()
var settings = require('./configs/settings.js').get()

var debug = require('debug')('meanstackjs:run')

function run (ServerConstructor, opts, cb) {
  debug('start run - ServerConstructor')
  if (!opts) opts = {}
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var server = new ServerConstructor(opts, function (err) {
    if (err) {
      console.error('Error during ' + server.settings.title + ' startup. Abort.')
      console.error(err.stack)
      process.exit(1)
    }

    debug('end run - ServerConstructor')
    typeof cb === 'function' && cb()
  })

  process.on('uncaughtException', function (err) {
    debug('system err:' + err)

    console.error('[UNCAUGHT EXCEPTION]')

    switch (err.code) {
      case 'EACCES':
        console.log('Try Running in Sudo or Admin access')
        break
      case 'EADDRINUSE':
        console.log('The Port is already occupied')
        break
    }

    console.error(err.stack)

    if (environment === 'development') {
      console.error('[UNCAUGHT EXCEPTION] ' + err.message)
      console.error(err.stack.toString())
      process.exit(1)
    } else {
      var message = {}
      message.to = settings.email.error
      message.subject = '[UNCAUGHT EXCEPTION] ' + err.message
      message.text = err.stack.toString()
      mail.send(message, function (err) {
        if (err) throw err
        process.exit(1)
      })
    }
  })
}

if (!module.parent) {
  run(Mean)
  run(SocketIO)
}

module.exports = run
