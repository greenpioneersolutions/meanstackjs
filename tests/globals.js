process.env.NODE_ENV = 'nightwatch'
var MeanStack = require('../mean.server.js')
var run = require('../run.js')
module.exports = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: true,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 300,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 5000,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  throwOnMultipleElementsReturned: true,

  // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout: 10000,

  before: function (done) {
    run(MeanStack, function (err) {
      if (err) console.log(err)
      done()
    })
  },

  beforeEach: function (browser, cb) {
    cb()
  },

  after: function (cb) {
    cb()
    process.exit(0) // doing this because the cb() wasnt working
  },

  afterEach: function (browser, cb) {
    cb()
  },

  reporter: function (results, cb) {
    // console.log(results, 'reporter')
    cb()
  }
}
