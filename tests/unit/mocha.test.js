process.env.NODE_ENV = 'nightwatch'
var Mean = require('../../server.mean.js')
var run = require('../../run.js')
var glob = require('glob')

describe('MEANSTACKJS Unit Testing', function () {
  before(function (done) {
    this.timeout(10000)
    run(Mean, function () {
      require('../seed.js')(function () {
        done()
      })
    })
  })
  glob.sync('server/modules/**/*.spec.js').forEach(function (file) {
    require('../../' + file)
  })
})
