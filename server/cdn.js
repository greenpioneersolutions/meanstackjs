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
      console.log('MAXCDN: STATUS')
      if (err) {
        console.error('PURGE ERROR: ', err.stack || err.message || err)
        return
      } else if (res.code !== 200) {
        console.error('PURGE ERROR: ', res.code)
        return
      }
      console.log('PURGE SUCCESS')
    })
  }
}
