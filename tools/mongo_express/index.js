var debug = require('debug')('meanstackjs:tools')
module.exports = function (self) {
  debug('started setupToolNightwatch')
  if (self.environment === 'development') {
    var MongoExpress = require('./server.mongo_express.js')
    self.run(MongoExpress, self)
  }
  debug('end setupToolNightwatch')
}
