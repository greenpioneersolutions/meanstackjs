process.env.NODE_ENV = 'nightwatch'
var Mean = require('../../server.mean.js')
var run = require('../../run.js')
var glob = require('glob')

run(Mean)
require('../seed.js')(function () {
  glob.sync('server/modules/**/*.spec.js').forEach(function (file) {
    require('../../' + file)
  })
})
