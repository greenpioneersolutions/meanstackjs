const glob = require('glob')
const path = require('path')
const Mean = require('../server.js')
const run = require('../../run.js')

process.env.NODE_ENV = 'nightwatch'

describe('MEANSTACKJS API Testing', function () {
  before(function (done) {
    this.timeout(20000)
    run(Mean, {
      seed: true
    }, function () {
      setTimeout(done, 1500)
    })
  })
  glob.sync('./server/modules/**/*.spec.js').forEach(function (file) {
    require(path.resolve(file))
  })
})
