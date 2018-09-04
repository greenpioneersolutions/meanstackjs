module.exports = setupToolNightwatch
function setupToolNightwatch (self) {
  if (self.settings.environment === 'development') {
    var MongoExpress = require('./server.mongo_express.js')
    self.run(MongoExpress, self)
  }
}
