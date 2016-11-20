var Mean = require('./server.mean.js')
var SocketIO = require('./server.socketio.js')
var run = require('./run.js')
var environment = require('./configs/environment.js').get()

if (!module.parent) {
  if (environment === 'development') {
    run(Mean)
    run(SocketIO)
  } else {
    run(Mean)
    run(SocketIO)
  }
}
