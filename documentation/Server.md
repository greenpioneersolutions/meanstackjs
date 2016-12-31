### Server Structure

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **server**/layout/                 | Folder: Swig Layout before rendered to user                  |
| **server**/modules/                | Folder:all dynamic modules to run server side logic          |
| **server**/error.js             | File:This handles any unexpected errors in express and exposes a log & middleware|
| **server**/mail.js             | File:This gives you the ability to email   |
| **server**/middleware.js             | File:This holds all of the middleware to use   |
| **server**/passport.js             | File:This has the login system  |
| **server**/register.js             | File:This file is used to gather all modules to gether and to register them properly   |
| **server**/cdn.js             | File:This file is for those using a cdn like maxcdn  |
| **server**/config.js             | File:This file is used to set up expressjs initially, middleware & passport |
| **server**/db.js             | File:This file is to connect to the database in the start of the build process  |
| **server**/headers.js             | File:This file is used to set up the headers that go out on every route   |
| **server**/logger.js             | File:This file is used to set up our morgan logger & debug statements on all routes   |
| **server**/prerenderer.js             | File:This file is used by seo to prerender certain requests   |
| **server**/routes.js             | File:This file is used to set up all system static routes including the main '/*' route with ejs templating  |
| **server**/security.js             | File:This file is used to set up helmet, hpp, cors & content length    |
| **server**/seo.js             | File:This file is used for the main route to properly response to all request for seo  |

#### How Server.Mean.Js Works
How it works

``` javascript
module.exports = Mean
var debug = require('debug')('meanstackjs:server')
var forceSSL = require('express-force-ssl')
var fs = require('fs')
var glob = require('glob')
var https = require('https')
var _ = require('lodash')
var run = require('./run.js')

function Mean (opts, done) {
  var self = this
  self.dir = __dirname
  self.opts = opts
  self.run = run
  self.environment = require('./configs/environment.js').get()
  self.settings = require('./configs/settings.js').get()
  self.port = self.opts.port || self.settings.https.active ? self.settings.https.port : self.settings.http.port
  self.middleware = require('./server/middleware.js')
  self.mail = require('./server/mail.js')
  // Connect to MongoDb
  require('./server/db.js')(self)
  // Start of the build process
  // setupExpressConfigs > Used to set up expressjs initially, middleware & passport.
  require('./server/config.js')(self)
  // setupExpressSecurity > Used to set up helmet, hpp, cors & content length.
  require('./server/security.js')(self)
  // setupExpressHeaders > Used to set up the headers that go out on every route.
  require('./server/headers.js')(self)
  // setupExpressLogger > Used to set up our morgan logger & debug statements on all routes.
  require('./server/logger.js')(self)
  // setupTools > Used to set up every tool in the tools directory.
  var files = glob.sync('./tools/*/package.json')
  files.forEach(function (n, k) {
    var packageInfo = require(n)
    if (packageInfo.active || _.isUndefined(packageInfo.active)) {
      var mainPath = _.replace(n, 'package.json', packageInfo.main)
      require(mainPath)(self)
    }
  })
  // setupRegister > Used to gather all modules to gether and to register them properly
  require('./server/register.js')(self)
  // setupStaticRoutes > Used to set up all system static routes including the main '/*' route with ejs templating.
  require('./server/routes.js')(self)
  // setupExpressErrorHandler > Used to set up our customer error handler in the server folder. NOTE: This goes after routes because we do not want it potentally default to express error handler
  require('./server/error.js').middleware(self)
  // purgeMaxCdn - *** OPTIONAL ***  > Used to purge the max cdn cache of the file. We Support MAXCDN
  require('./server/cdn.js')(self)
  // auto  - connectMongoDb :  server > Used to finsh the final set up of the server. at the same time we start connecting to mongo and turning on the server.

  if (self.settings.https.active) {
    https.createServer({
      key: fs.readFileSync(self.settings.https.key),
      cert: fs.readFileSync(self.settings.https.cert)
    }, self.app).listen(self.settings.https.port, function () {
      console.log('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
      debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
      // Force SSL if the http is not active
      if (!self.settings.http.active) {
        var app = require('express')()
        app.set('forceSSLOptions', {
          httpsPort: self.settings.https.port
        })
        app.use('/*', forceSSL)
        app.listen(self.settings.http.port, function () {
          console.log('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.app.get('env'))
          debug('HTTP FORCE SSL Express server listening on port %d in %s mode', self.settings.http.port, self.app.get('env'))
          done()
        })
      }
    })
  }
  // check if you set both to false we default to turn on http
  if (self.settings.http.active || (self.settings.https.active === false) === (self.settings.http.active === false)) {
    self.app.listen(self.app.get('port'), function () {
      console.log('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
      debug('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
      done()
    })
  }
}

if (!module.parent) {
  run(Mean)
}


```

#### How Register.js Works
How it works

``` javascript

function Register (self, done) {
  // Start Build Process
  // getFolderContents > Used to dynamically get all of the contents of all module folders.
  this.getFolderContents(self)
  // setupFrontendDirectories > Used to set up all directories need & to remove the previously compiled files.
  this.setupFrontendDirectories(self)
  // compileFrontendStylesScripts > Used to compile all of the info needed for styles & scripts to render later.
  this.compileFrontendStylesScripts(self)
  // compileBackendScripts > Used to compile all of the info need for all of the backend modules.
  this.compileBackendScripts(self)
  // transformBabel > Used to transform files to es6 - commented out till the next release.
  // self.transformBabel()
  // setupServerModels > Used to set up the mongoose modules.
  this.setupServerModels(self)
  // setupServerRoutes > Used to set up the module routes.
  this.setupServerRoutes(self)
  // renderFrontendFiles > Used to render all of the frontend files based on all the information from above.
  this.renderFrontendFiles(self)
  // updateFrontendCdn > Used to update the files based of if your using a cdn. We Support MAXCDN.
  this.updateFrontendCdn(self)
  // frontendFiles > Returns the files to send to the frontend
  return self.frontendFiles
}

```

#### Create a route
How it works

``` javascript
// test.routes.js
var test = require('./test.controller.js')
module.exports = function (app, auth, mail, settings, models) {
  app.get('/api/math', test.doMath)
  app.get('/api/query' , test.queryParameters)
}
// test.controller.js
exports.queryParameters = function (req, res, next) {
  res.status(200).send({
    query: req.queryParameters
  })
}
exports.doMath = function (req, res) {
  var count = req.body.number * 15 
  res.status(200).send({
    count: count
  })
}

```

#### Create a route & pass arguments
How it works

``` javascript
// test.routes.js
var test = require('./test.controller.js')
module.exports = function (app, auth, mail, settings, models) {
  app.post('/api/mail', test.sendMail(mail, settings))
}
// test.controller.js
exports.sendMail = function (mail, settings) {
  return function (req, res) {
    mail.send({
    to: 'test@greenpioneersolutions.com',
    subject: 'Test Email',
    text: 'Test Email Text'
    },function(){
      res.status(201).send()
    })    
  }
}

```

#### Create a Model/Schema
How it works

``` javascript

var mongoose = require('mongoose')

var blogSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }
})

module.exports = blogSchema

```

#### Validate a Model/Schema
How it works

``` javascript
var mongoose = require('mongoose')
var validate = require('mongoose-validator')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'We need an email address to create your account.',
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Your email address is invalid.'
      }),
      validate({
        validator: 'isLength',
        arguments: 3,
        message: 'We need an email address to create your account.'
      })
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [ 6, 255 ],
        message: 'Your password must be at least 6 characters.'
      })
    ]
  },
  name: {
    type: String,
    index: true,
    required: 'We need a name to create your account.',
    validate: [
      validate({
        validator: 'contains',
        arguments: ' ',
        message: 'Please use your full name.'
      }),
      validate({
        validator: 'isLength',
        arguments: 3,
        message: 'We need a name to create your account.'
      })
    ]
  }
    
})

// Trim whitespace
userSchema.pre('validate', function (next) {
  var self = this
  if (typeof self.email === 'string') {
    self.email = self.email.trim()
  }
  if (typeof self.profile.name === 'string') self.profile.name = self.profile.name.trim()
  next()
})

module.exports = userSchema

```

#### Create a Middleware
How it works

``` javascript
// server/middleware.js
// http://expressjs.com/en/guide/writing-middleware.html
exports.myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

```

#### Create Pug Route
How it works

``` javascript
var pug = require('pug')
var path = require('path')

app.get('/api/settings/', function (req, res) {
    res.send(pug.renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  })

```

#### Create Test Spec
How it works

``` javascript
//test.spec.js
var assert = require('chai').assert
var request = require('supertest')

describe('USERS', function () {
  describe('GET /api/authenticate', function () {
    it('should be returning unauthenticated', function (done) {
      request('localhost:3002/')
        .get('api/authenticate')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.equal(res.body.success, false)
          assert.equal(res.body.authenticated, false)
          assert.equal(res.body.redirect, false)
          done()
        })
    })
  })
})


```

#### Send Mail
How it works

``` javascript
var mail = require('./mail.js')
mail.send({
to: 'test@greenpioneersolutions.com',
subject: 'Test Email',
text: 'Test Email Text'
},function(){
  res.status(201).send()
}) 
//or
// test.routes.js
var test = require('./test.controller.js')
module.exports = function (app, auth, mail, settings, models) {
  app.post('/api/mail', test.sendMail(mail, settings))
}
// test.controller.js
exports.sendMail = function (mail, settings, models) {
  return function (req, res) {
    mail.send({
    to: 'test@greenpioneersolutions.com',
    subject: 'Test Email',
    text: 'Test Email Text'
    },function(){
      res.status(201).send()
    })    
  }
}

```

#### Get Settings
How it works

``` javascript

var settings = require('../../../configs/settings.js').get()
//or 
var settings = require('../../../configs/settings.js').set(swagger,false)

```

#### Add Swagger
How it works

``` javascript
// swagger/test/models.js
User: {
    id: 'User',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        description: 'Email used for authentication and notifications'
      },
      password: {
        type: 'string',
        description: 'Password of the user'
      }
    }
  },

// swagger/test/services.js
var get = {
    'spec': {
      description: 'Authenticate operations',
      path: '/authenticate',
      method: 'GET',
      summary: 'Get Authenticate',
      notes: '',
      type: 'User',
      nickname: 'getAuthenticate',
      produces: ['application/json']
    }
  }
var post = {
    'spec': {
      description: 'Authenticate operations',
      path: '/authenticate',
      method: 'POST',
      summary: 'get Token',
      notes: '',
      type: 'User',
      nickname: 'createArticle',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'get User Token.',
        required: true,
        type: 'User',
        paramType: 'body',
        allowMultiple: false
      }]
    }
swagger.addGet(get)
    .addPost(post)

```

#### Validate Route Params
How it works

``` javascript

exports.test = function (req, res, next) {
  var redirect = req.body.redirect || false
  // check options for validate here https://github.com/ctavan/express-validator and go check our custom ones in server.mean.js
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  var errors = req.validationErrors()
  if (errors) {
    return res.status(401).send({
      success: false,
      authenticated: false,
      msg: errors[0].msg,
      redirect: redirect
    })
  }
  //reset of your functions
}

```