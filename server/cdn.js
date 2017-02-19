module.exports = cdn
var MaxCDN = require('maxcdn')
function cdn (self) {
  if (self.settings.maxcdn.zoneId) {
    var maxcdn = new MaxCDN(
      self.settings.maxcdn.companyAlias,
      self.settings.maxcdn.consumerKey,
      self.settings.maxcdn.consumerSecret
    )
    maxcdn.del('zones/pull.json/' + self.settings.maxcdn.zoneId + '/cache', function (err, res) {
      self.logger.info('MAXCDN: STATUS')
      if (err) {
        self.logger.warn('PURGE ERROR: ', err.stack || err.message || err)
        return
      } else if (res.code !== 200) {
        self.logger.warn('PURGE ERROR: ', res.code)
        return
      }
      self.logger.info('PURGE SUCCESS')
    })
  }
}
