module.exports = setupToolNightwatch

var debug = require('debug')('meanstackjs:tools')

function setupToolNightwatch (self) {
  debug('started setupToolNightwatch')
  if (self.environment === 'development') {
    var MongoExpress = require('./server.mongo_express.js')
    self.run(MongoExpress, self)
  }
  debug('end setupToolNightwatch')
}
