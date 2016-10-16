var express = require('express')
var settings = require('./configs/settings.js').get()
var debug = require('debug')('meanstackjs:mongoExpress')

var mongoexpress = {
  mongodb: {
    server: process.env.MONGODB_SERVER || settings.mongodb.host,
    port: process.env.MONGODB_PORT || settings.mongodb.port,

    // useSSL: connect to the server using secure SSL
    useSSL: process.env.MONGODB_SSL || settings.mongodb.ssl,

    // autoReconnect: automatically reconnect if connection is lost
    autoReconnect: true,

    // poolSize: size of connection pool (number of connections to use)
    poolSize: settings.mongodb.size || 1,

    // set admin to true if you want to turn on admin features
    // if admin is true, the auth list below will be ignored
    // if admin is true, you will need to enter an admin username/password below (if it is needed)
    admin: process.env.MONGODB_ENABLE_ADMIN ? process.env.MONGODB_ENABLE_ADMIN.toLowerCase() === 'true' : false,

    // >>>>  If you are using regular accounts, fill out auth details in the section below
    // >>>>  If you have admin auth, leave this section empty and skip to the next section
    auth: [
      /*
       * Add the name, username, and password of the databases you want to connect to
       * Add as many databases as you want!
       */
      {
        database: process.env.MONGODB_AUTH_DATABASE || settings.mongodb.db,
        username: process.env.MONGODB_AUTH_USERNAME || settings.mongodb.username,
        password: process.env.MONGODB_AUTH_PASSWORD || settings.mongodb.password
      }
    ],

    //  >>>>  If you are using an admin mongodb account, or no admin account exists, fill out section below
    //  >>>>  Using an admin account allows you to view and edit all databases, and view stats

    // leave username and password empty if no admin account exists
    adminUsername: process.env.MONGODB_ADMINUSERNAME || '',
    adminPassword: process.env.MONGODB_ADMINPASSWORD || '',

    // whitelist: hide all databases except the ones in this list  (empty list for no whitelist)
    whitelist: [],

    // blacklist: hide databases listed in the blacklist (empty list for no blacklist)
    blacklist: []
  },

  site: {
    // baseUrl: the URL that mongo express will be located at - Remember to add the forward slash at the stard and end!
    baseUrl: process.env.SITE_BASEURL || '/',
    cookieKeyName: 'mongo-express',
    cookieSecret: process.env.SITE_COOKIESECRET || 'cookiesecret',
    host: process.env.VCAP_APP_HOST || 'localhost',
    port: process.env.VCAP_APP_PORT || 8081,
    requestSizeLimit: process.env.REQUEST_SIZE || '50mb',
    sessionSecret: process.env.SITE_SESSIONSECRET || 'sessionsecret',
    sslCert: process.env.SITE_SSL_CRT_PATH || '',
    sslEnabled: process.env.SITE_SSL_ENABLED || false,
    sslKey: process.env.SITE_SSL_KEY_PATH || ''
  },

  // set useBasicAuth to true if you want to authehticate mongo-express loggins
  // if admin is false, the basicAuthInfo list below will be ignored
  // this will be true unless BASICAUTH_USERNAME is set and is the empty string
  useBasicAuth: process.env.BASICAUTH_USERNAME !== '',

  basicAuth: {
    username: process.env.BASICAUTH_USERNAME || 'admin',
    password: process.env.BASICAUTH_PASSWORD || 'pass'
  },
  console: false,
  options: {
    // documentsPerPage: how many documents you want to see at once in collection view
    documentsPerPage: 10,

    // editorTheme: Name of the theme you want to use for displaying documents
    // See http://codemirror.net/demo/theme.html for all examples
    editorTheme: process.env.OPTIONS_EDITORTHEME || 'rubyblue',

    // Maximum size of a single property & single row
    // Reduces the risk of sending a huge amount of data when viewing collections
    maxPropSize: (100 * 1000), // default 100KB
    maxRowSize: (1000 * 1000), // default 1MB

    // The options below aren't being used yet

    // cmdType: the type of command line you want mongo express to run
    // values: eval, subprocess
    //  eval - uses db.eval. commands block, so only use this if you have to
    //  subprocess - spawns a mongo command line as a subprocess and pipes output to mongo express
    cmdType: 'eval',

    // subprocessTimeout: number of seconds of non-interaction before a subprocess is shut down
    subprocessTimeout: 300,

    // readOnly: if readOnly is true, components of writing are not visible.
    readOnly: false,

    // collapsibleJSON: if set to true, jsons will be displayed collapsible
    collapsibleJSON: true,

    // collapsibleJSONDefaultUnfold: if collapsibleJSON is set to `true`, this defines default level
    //  to which JSONs are displayed unfolded; use number or "all" to unfold all levels
    collapsibleJSONDefaultUnfold: 1
  },

  // Specify the default keyname that should be picked from a document to display in collections list.
  // Keynames can be specified for every database and collection.
  // If no keyname is specified, it defaults to '_id', which is a mandatory field.
  // For Example :
  // defaultKeyNames{
  //   "world_db":{  //Database Name
  //     "continent":"cont_name", // collection:field
  //     "country":"country_name",
  //     "city":"name"
  //   }
  // }
  defaultKeyNames: {

  }
}

function MongoExpress (opts, done) {
  var self = this
  self.app = express()
  self.opts = opts
  self.app.set('port', settings.mongoexpress.port)
  self.app.use('/', require('mongo-express/lib/middleware')(mongoexpress))
  self.app.listen(self.app.get('port'), function () {
    console.log('Mongo-Express server listening on port %d ', self.app.get('port'))
    debug('Express server listening on port %d', self.app.get('port'))
  })
  done(null)
}

var run = require('./run.js')
if (!module.parent) {
  run(MongoExpress)
}

module.exports = MongoExpress