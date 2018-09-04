module.exports = { init, disconnect, connect, reconnect, readyState }

const _ = require('lodash')
const path = require('path')
const mongoose = require('mongoose')
const seed = require('./seed.js')

mongoose.set('useCreateIndex', true)
function connect (self) {
  mongoose.connect(self.settings.mongodb.uri, { useNewUrlParser: true })
}
function disconnect (cb) {
  if (!cb)cb = function () {}
  mongoose.disconnect(cb)
}
function reconnect (cb) {
  if (!cb)cb = function () {}
  mongoose.disconnect(cb)
  connect()
}
function init (self, cb) {
  if (!cb)cb = function () {}
  connect(self)
  registerModels(self)
  if (self.settings.environment !== 'production' && self.settings.seed) {
    seed(self, cb)
  }
}
function registerModels (self) {
  self.models = {}
  for (let i = 0; i < self.files.models.length; i++) {
    var name = _.words(path.basename(self.files.models[i]), /[^. ]+/g)[0]
    self.models[name] = mongoose.model(name, require(self.files.models[i]))
    self.models[name].on('index', function (error) {
      if (error) throw error
    })
  }
}
function readyState () { // 0 = disconnected// 1 = connected// 2 = connecting// 3 = disconnecting
  return mongoose.connection.readyState
}
