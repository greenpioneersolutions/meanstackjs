module.exports = Livereload

var path = require('path')
var livereload = require('livereload')

function Livereload (opts, done) {
  var server = livereload.createServer()
  server.watch(path.resolve(__dirname + '/client'))
  done(null)
}
var run = require('./run.js')
if (!module.parent) {
  run(Livereload)
}
