var Mean = require('./mean.server.js')
var SocketIO = require('./socketio.server.js')
var Livereload = require('./livereload.server.js')
var MongoExpress = require('./mongo_express.server.js')
var run = require('./run.js')
var environment = require('./server/environment.js').get()

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
