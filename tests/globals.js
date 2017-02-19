process.env.NODE_ENV = 'nightwatch'
var MeanStack = require('../server.mean.js')
var run = require('../run.js')
var HtmlReporter = require('nightwatch-html-reporter')
var path = require('path')
var reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: path.join(__dirname, '../tools/nightwatch/reports'),
  // The filename that the html report will be saved as.
  reportFilename: 'index.html',

  // The theme that will be used to generate the html report.
  // This should match a directory under the lib/themes directory.
  themeName: 'default',

  // If true then only errors will be shown in the report.
  hideSuccess: false
})
module.exports = {
  reporter: reporter.fn,
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
  asyncHookTimeout: 20000,

  before: function (done) {
    run(MeanStack, function (error) {
      if (error) console.log(error)
      require('./seed.js')(function () {
        done()
      })
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
  }
}
