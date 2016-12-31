process.env.NODE_ENV = 'nightwatch'
var Mean = require('../../server.mean.js')
var run = require('../../run.js')
describe('MEANSTACKJS API Testing', function () {
  before(function (done) {
    this.timeout(20000)
    run(Mean, function () {
      require('../seed.js')(function () {
        done()
      })
    })
  })
  require('glob').sync('server/modules/**/*.spec.js').forEach(function (file) {
    require('../../' + file)
  })
})
