// Karma configuration

module.exports = function (config) {
  var path = require('path')
  var _ = require('lodash')
  var dependencies = require('../../configs/settings.js').get().assets.js
  var dependencyFiles = _.map(dependencies, function (dependency) {
    return path.resolve('./client/' + dependency).toString()
  })
  var clientPath = '../../client'
  var srcFiles = [
    clientPath + '/modules/**/*.module.js',
    clientPath + '/modules/**/*.js'
  ]
  var files = dependencyFiles.reverse().concat(srcFiles)

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: files,

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ]
  })
}
