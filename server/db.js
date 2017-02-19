module.exports.mongoDB = db

var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:db')
var glob = require('glob')
var _ = require('lodash')
var path = require('path')

function db (self) {
  // Connect to MongoDb
  mongoose.Promise = global.Promise
  mongoose.set('debug', self.settings.mongodb.debug)
  mongoose.connect(self.settings.mongodb.uri, self.settings.mongodb.options)
  mongoose.connection.on('error', function (error) {
    self.logger.warn('MongoDB Connection Error. Please make sure that MongoDB is running.')
    debug('MongoDB Connection Error ', error)
  })
  mongoose.connection.on('open', function () {
    debug('MongoDB Connection Open ')
  })
  // Register All Mongoose Models
  self.models = {}
  var files = glob.sync('server/modules/**/*.model.js')
  files.forEach(function (model, key) {
    var name = _.words(path.basename(model), /[^. ]+/g)[0]
    debug('Model: %s - %s', name, model)
    self.models[name] = mongoose.model(name, require('../' + model))
    self.models[name].on('index', function (error) {
      if (error) throw error
    })
  })
}
