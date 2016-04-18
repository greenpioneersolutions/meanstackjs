var Mean = require('./mean.server.js')
var SocketIO = require('./socketio.server.js')
var Livereload = require('./livereload.server.js')
var MongoExpress = require('./mongo_express.server.js')
var run = require('./run.js')

var environment = 'development'
if (process.env.NODE_ENV === 'test') {
  environment = 'test'
} else if (process.env.NODE_ENV === 'production') {
  environment = 'production'
} else if (process.env.NODE_ENV === 'nightwatch') {
  environment = 'nightwatch'
}

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
