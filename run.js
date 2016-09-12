module.exports = run

var extend = require('xtend')
var minimist = require('minimist')
var Mean = require('./server.mean.js')
var SocketIO = require('./server.socketio.js')
var Livereload = require('./server.livereload.js')
var MongoExpress = require('./server.mongo_express.js')
var mail = require('./server/mail.js')
var environment = require('./configs/environment.js').get()
var settings = require('./configs/settings.js').get()
var argv = minimist(process.argv.slice(2))
var debug = require('debug')('meanstackjs:run')

function run (ServerConstructor, cb) {
  debug('start run - ServerConstructor')
  var server = new ServerConstructor(extend(argv), function (err) {
    if (err) {
      console.error('Error during ' + server.settings.title + ' startup. Abort.')
      console.error(err.stack)
      process.exit(1)
    }
    debug('end run - ServerConstructor')
    if (cb && typeof cb === 'function')cb()
  })

  process.on('uncaughtException', function (err) {
    debug('system err:' + err)
    console.error('[UNCAUGHT EXCEPTION]')
    if (err.code === 'EACCES')console.log('Try Running in Sudo or Admin access')
    if (err.code === 'EADDRINUSE')console.log('The Port is already occupied')
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
  run(Livereload)
  run(MongoExpress)
}
