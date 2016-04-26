process.env.NODE_ENV = 'nightwatch'
var Mean = require('../../server.mean.js')
var run = require('../../run.js')
var glob = require('glob')

run(Mean, function (err) {
  if (err) console.log(err)
  require('../seed.js')
})

glob.sync('server/modules/**/*.spec.js').forEach(function (file) {
  require('../../' + file)
})
