module.exports = run

var Mean = require('./server.mean.js')
var SocketIO = require('./server.socketio.js')
var error = require('./server/error.js')
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
}

process.on('unhandledRejection', function (reason) {
  debug('System Error unhandledRejection:' + reason)
  console.error('[UNHANDLED REJECTION]')
  console.error(error.log(reason))
})

process.on('uncaughtException', function (err) {
  try {
    require('./server/db.js').disconnect(function () {
      console.log('Disconnected Database')
    })
  } catch (disconnectError) {
    console.log('Error Trying to disconnect from the DB', disconnectError)
  }
  debug('System Error uncaughtException:' + err)
  console.error('[UNCAUGHT EXCEPTION] - ', err.message)
  console.log()
  switch (err.code) {
    case 'EACCES':
      console.log('(Permission denied): An attempt was made to access a file in a way forbidden by its file access permissions.')
      break
    case 'EADDRINUSE':
      console.log('(Address already in use): An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.')
      break
    case 'ECONNREFUSED':
      console.log('(Connection refused): No connection could be made because the target machine actively refused it. This usually results from trying to connect to a service that is inactive on the foreign host.')
      break
    case 'ECONNRESET':
      console.log('(Connection reset by peer): A connection was forcibly closed by a peer. This normally results from a loss of the connection on the remote socket due to a timeout or reboot. Commonly encountered via the http and net modules.')
      break
    case 'EEXIST':
      console.log('(File exists): An existing file was the target of an operation that required that the target not exist.')
      break
    case 'EISDIR':
      console.log('(Is a directory): An operation expected a file, but the given pathname was a directory.')
      break
    case 'EMFILE':
      console.log('(Too many open files in system): Maximum number of file descriptors allowable on the system has been reached, and requests for another descriptor cannot be fulfilled until at least one has been closed. This is encountered when opening many files at once in parallel, especially on systems (in particular, OS X) where there is a low file descriptor limit for processes. To remedy a low limit, run ulimit -n 2048 in the same shell that will run the Node.js process.')
      break
    case 'ENOENT':
      console.log('(No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist -- no entity (file or directory) could be found by the given path.')
      break
    case 'ENOTDIR':
      console.log('(Not a directory): A component of the given pathname existed, but was not a directory as expected. Commonly raised by fs.readdir.')
      break
    case 'ENOTEMPTY':
      console.log('(Directory not empty): A directory with entries was the target of an operation that requires an empty directory -- usually fs.unlink.')
      break
    case 'EPERM':
      console.log('(Operation not permitted): An attempt was made to perform an operation that requires elevated privileges.')
      break
    case 'EPIPE':
      console.log('(Broken pipe): A write on a pipe, socket, or FIFO for which there is no process to read the data. Commonly encountered at the net and http layers, indicative that the remote side of the stream being written to has been closed.')
      break
    case 'ETIMEDOUT':
      console.log('(Operation timed out): A connect or send request failed because the connected party did not properly respond after a period of time. Usually encountered by http or net -- often a sign that a socket.end() was not properly called.')
      break
  }
    // Our Custom Error Handler
  error.log(err, function (logErr) {
    if (logErr)console.log('Error in log function in errors.js')
      // How do you want to handle your errors ? email admin , exit process or nothing at all ?
    process.exit(1)
      // var settings = require('./configs/settings.js').get()
      // var environment = require('./configs/environment.js').get()
      // if (environment === 'production') {
      //   var message = {}
      //   message.to = settings.email.error
      //   message.subject = '[UNCAUGHT EXCEPTION] ' + err.message
      //   message.text = err.stack.toString()
      //   console.log(message)
      //   console.log('Sending Email in production is commented out ./run.js:99')
      //   var mail = require('./server/mail.js')
      //   mail.send(message, function (err) {
      //     if (err) throw err
      //     process.exit(1)
      //   })
      // }
  })
})

if (!module.parent) {
  run(Mean)
  run(SocketIO)
}
