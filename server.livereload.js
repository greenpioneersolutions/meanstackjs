module.exports = Livereload

var path = require('path')
var livereload = require('livereload')
var debug = require('debug')('meanstackjs:livereload')

function Livereload (opts, done) {
  var server = livereload.createServer()
  server.watch(path.join(__dirname, '/client'))
  debug('starting Livereload Server')
  done(null)
}

var run = require('./run.js')
if (!module.parent) {
  run(Livereload)
}
