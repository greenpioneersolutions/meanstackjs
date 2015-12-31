'use strict'

var path = require('path')
var rootPath = path.normalize(__dirname + '/../..')
var _ = require('lodash')
var baseLine = {
  root: rootPath,
  hostname: process.env.HOST || process.env.HOSTNAME,
  templateEngine: 'swig',
  // The secret should be set to a non-guessable string that
  // is used to compute a session hash
  sessionSecret: 'MEANSTACKJS',
  // The name of the MongoDB collection to store sessions in
  sessionCollection: 'sessions',
  // The session cookie settings
  sessionCookie: {
    path: '/',
    httpOnly: true,
    // If secure is set to true then it will cause the cookie to be set
    // only when SSL-enabled (HTTPS) is used, and otherwise it won't
    // set a cookie. 'true' is recommended yet it requires the above
    // mentioned pre-requisite.
    secure: false,
    // Only set the maxAge to null if the cookie shouldn't be expired
    // at all. The cookie will expunge when the browser is closed.
    maxAge: null
  },
  html: {
    googleAnalytics: 'UA-71654331-1',
    keywords: 'MEAN, MEANSTACKJS, mongodb, expressjs, angularjs,nodejs, javascript',
    description: 'The Meanstack js is a opensource framework that is made for and by developers'
  },

  // The session cookie name
  sessionName: 'connect.meanstackjs',
  title: 'MEANSTACKJS',

  // AGGREGATION
  // bower_components -  Needs to be manually added below
  // modules - aggregated automatically
  // images - manually called in files
  // styles - manually called  & automatically compiles the global style scss in COMPILED Folder
  // uploads - Automatic uploads to be manually called in the files
  // USE EXTERNAL FILES - 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
  // OR USE INTERNAL FILES - '/bower_components/jquery/dist/jquery.js'
  assets: {
    js: [
      '/bower_components/ng-file-upload/ng-file-upload-all.js',
      '/bower_components/angular-mocks/angular-mocks.js',
      '/bower_components/angular-cookies/angular-cookies.js',
      '/bower_components/angular-sanitize/angular-sanitize.js',
      '/bower_components/angular-animate/angular-animate.js',
      '/bower_components/angular-resource/angular-resource.js',
      '/bower_components/angular-ui-router/release/angular-ui-router.js',
      '/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      '/bower_components/angular-moment/angular-moment.js',
      '/bower_components/moment/moment.js',
      '/bower_components/lodash/lodash.js',
      '/bower_components/toastr/toastr.js',
      '/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      '/bower_components/angular/angular.js',
      '/bower_components/jquery/dist/jquery.js'
    ],
    css: [
      '/styles/compiled/global.style.css',
      '/bower_components/toastr/toastr.css',
      '/bower_components/font-awesome/css/font-awesome.min.css'
    ]
  },
  buildreq: {
    console: true,
    response: {
      method: 'get',
      data: {},
      user: {},
      count: 0,
      hostname: '',
      type: '',
      actions: {
        prev: false,
        next: false,
        reload: false
      },
      delete: ['error']
    },
    query: {
      sort: '',
      limit: 20,
      select: '',
      filter: {},
      populateId: 'user',
      populateItems: '',
      lean: false,
      skip: 0,
      where: '',
      gt: 1,
      lt: 0,
      in: [],
      equal: '',
      errorMessage: 'Unknown Value'
    },
    routing: {
      schema: true,
      url: '/api/v1/',
      build: true
    }
  }
}
var settings
if (process.env.NODE_ENV === 'test') {
  settings = _.merge(baseLine, require('./environments/test.js'))
} else if (process.env.NODE_ENV === 'production') {
  settings = _.merge(baseLine, require('./environments/production.js'))
} else {
  settings = _.merge(baseLine, require('./environments/development.js'))
}

module.exports = settings
