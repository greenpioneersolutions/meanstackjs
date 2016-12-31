module.exports = db
var mongoose = require('mongoose')
var debug = require('debug')('meanstackjs:db')

function db (self) {
// Connect to MongoDb
  mongoose.Promise = global.Promise
  mongoose.set('debug', self.settings.mongodb.debug)
  mongoose.connect(self.settings.mongodb.uri, self.settings.mongodb.options)
  mongoose.connection.on('error', function (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
    debug('MongoDB Connection Error ', err)
  })
  mongoose.connection.on('open', function () {
    debug('MongoDB Connection Open ')
  })
}
