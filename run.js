module.exports = run

var extend = require('xtend')
var minimist = require('minimist')
var Site = require('./mean.server.js')
var SocketIO = require('./socketio.server.js')
var Livereload = require('./livereload.server.js')

var argv = minimist(process.argv.slice(2))

/**
 * Run the given server, passing in command line options as options.
 * @param  {function(*)} ServerConstructor
 */
function run (ServerConstructor) {
  // Create and start the server
  var server = new ServerConstructor(extend(argv), function (err) {
    if (err) {
      console.error('Error during ' + server.serverName + ' startup. Abort.')
      console.error(err.stack)
      process.exit(1)
    }
  })

  process.on('uncaughtException', function (err) {
    console.error('[UNCAUGHT EXCEPTION]')
    console.error(err.stack)
  // message.to = settings.error
  // message.subject = '[UNCAUGHT EXCEPTION] ' + err.message
  // message.text = err.stack.toString()
  // console.log('message', message)
  // mail.send(message, function (err) {
  //   console.log(err, 'email sent server process?')
  //   if (err) throw err
  // })
  })
}

if (!module.parent) {
  console.log('parent')
  run(Site)
  run(SocketIO)
  run(Livereload)
}
