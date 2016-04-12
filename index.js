var Site = require('./mean.server.js')
var SocketIO = require('./socketio.server.js')
var Livereload = require('./livereload.server.js')
var run = require('./run.js')

if (!module.parent) {
  if (process.env.NODE_ENV === 'development') {
    run(Site)
    run(SocketIO)
    run(Livereload)
  } else {
    run(Site)
    run(SocketIO)
  }
}
