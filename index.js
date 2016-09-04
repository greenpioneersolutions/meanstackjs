var Mean = require('./server.mean.js')
var SocketIO = require('./server.socketio.js')
var Livereload = require('./server.livereload.js')
var MongoExpress = require('./server.mongo_express.js')
var run = require('./run.js')
var environment = require('./configs/environment.js').get()

if (!module.parent) {
  if (environment === 'development') {
    run(Mean)
    run(SocketIO)
    run(Livereload)
    run(MongoExpress)
  } else {
    run(Mean)
    run(SocketIO)
  }
}
