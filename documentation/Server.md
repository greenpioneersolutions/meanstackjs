### Server Structure 

WORK IN PROGRESS

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **server**/layout/                 | Folder: Swig Layout before rendered to user                  |
| **server**/modules/                | Folder:all dynamic modules to run server side logic          |
| **server**/swagger/                | Folder:all files to display api documentation          |
| **server**/dist/                   | Folder:all files created by the system if you use babel         |
| **server**/environment.js             | File:This is a getter/setter for the env   |
| **server**/error.js             | File:This handles any unexpected errors in express |
| **server**/error.pug             | File:This is the template for error.js    |
| **server**/mail.js             | File:This gives you the ability to email   |
| **server**/middleware.js             | File:This holds all of the middleware to use   |
| **server**/passport.js             | File:This has the login system  |
| **server**/register.js             | File:This file registers all the dynamic frontend & backend modules    |


#### How Server.Mean.Js Works
How it works

``` javascript
var run = require('./run.js')
if (!module.parent) {
  run(Mean)
}

function Mean (opts, done) {
  var self = this
  self.opts = opts
  self.environment = require('./configs/environment.js').get()
  self.settings = require('./configs/settings.js').get()
  self.port = self.opts.port || self.settings.http.port
  self.middleware = require('./server/middleware.js')
  self.mail = require('./server/mail.js')
  self.dir = __dirname
  self.register = require('./server/register.js')
  // Start of the build process
  // setupExpressConfigs > Used to set up expressjs initially, middleware & passport.
  self.setupExpressConfigs()
  // setupExpressErrorHandler > Used to set up our customer error handler in the server folder.
  self.setupExpressErrorHandler()
  // setupExpressSecurity > Used to set up helmet, hpp, cors & content length.
  self.setupExpressSecurity()
  // setupExpressHeaders > Used to set up the headers that go out on every route.
  self.setupExpressHeaders()
  // setupExpressLogger > Used to set up our morgan logger & debug statements on all routes.
  self.setupExpressLogger()
  // setupServerRoutesModels > Used to set up the register function to dynamically build all of the models, routes & frontend files.
  self.setupServerRoutesModels()
  // setupToolSwagger - *** OPTIONAL *** >  Used to set up swagger.io to represent the api with a nice ui. http://localhost:3000/api/
  self.setupToolSwagger()
  // setupToolAgenda - *** OPTIONAL *** >  Used to set up  agenda to manage light-weight job scheduling with a nice ui. http://localhost:3000/agenda
  self.setupToolAgenda()
  // setupToolNightwatch - *** OPTIONAL *** >  Used to set up the view into the reporting of how e2e did . http://localhost:3000/e2e/
  self.setupToolNightwatch()
  // setupToolPlato - *** OPTIONAL *** >  Used to set up the view into the reporting of how the analysis  . http://localhost:3000/plato/
  self.setupToolPlato()
  // setupToolLivereload - *** OPTIONAL *** >  Used to set up livereload which allows you as the developer to develop faster due to not having to manually restarting the server after every change
  self.setupToolLivereload()
  // setupStaticRoutes > Used to set up all system static routes including the main '/*' route with ejs templating.
  self.setupStaticRoutes()
  // purgeMaxCdn - *** OPTIONAL ***  > Used to purge the max cdn cache of the file. We Support MAXCDN
  self.purgeMaxCdn()
  // auto  - connectMongoDb :  server > Used to finsh the final set up of the server. at the same time we start connecting to mongo and turning on the server.
  auto({
    connectMongoDb: function (callback) {
      mongoose.Promise = Promise
      mongoose.set('debug', self.settings.mongodb.debug)
      mongoose.connect(self.settings.mongodb.uri, self.settings.mongodb.options)
      mongoose.connection.on('error', function (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
        debug('MongoDB Connection Error ')
        callback(err, null)
      })
      mongoose.connection.on('open', function () {
        debug('MongoDB Connection Open ')
        callback(null, {
          db: self.settings.mongodb.uri,
          dbOptions: self.settings.mongodb.options
        })
      })
    },
    server: function (callback) {
      if (self.settings.https.active) {
        https.createServer({
          key: fs.readFileSync(self.settings.https.key),
          cert: fs.readFileSync(self.settings.https.cert)
        }, self.app).listen(self.settings.https.port, function () {
          console.log('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
          debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
          if (!self.settings.http.active) {
            callback(null, {
              port: self.app.get('port'),
              env: self.app.get('env')
            })
          }
        })
      }
      // check if you set both to false we default to turn on http
      if (self.settings.http.active || (self.settings.https.active === false) === (self.settings.http.active === false)) {
        self.app.listen(self.app.get('port'), function () {
          console.log('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
          debug('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
          callback(null, {
            port: self.app.get('port'),
            env: self.app.get('env')
          })
        })
      }
    }
  },
    function (err, results) {
      if (err) {
        console.log('Exiting because of error %d', err)
        debug('Exiting because of error %d', err)
        process.exit(1)
      }
      debug('Finished Server Load')
      done(null)
    })
}

```

#### How Register.js Works
How it works

``` javascript

function Register (opts, done) {
  var self = this

  self.environment = opts.environment
  self.mail = opts.mail
  self.app = opts.app
  self.settings = opts.settings
  self.middleware = opts.middleware
  self.dir = __dirname
  // Start Build Process
  // getFolderContents > Used to dynamically get all of the contents of all module folders.
  self.getFolderContents()
  // setupFrontendDirectories > Used to set up all directories need & to remove the previously compiled files.
  self.setupFrontendDirectories()
  // compileFrontendStylesScripts > Used to compile all of the info needed for styles & scripts to render later.
  self.compileFrontendStylesScripts()
  // compileBackendScripts > Used to compile all of the info need for all of the backend modules.
  self.compileBackendScripts()
  // transformBabel > Used to transform files to es6 - commented out till the next release.
  // self.transformBabel()
  // setupServerModels > Used to set up the mongoose modules.
  self.setupServerModels()
  // setupServerRoutes > Used to set up the module routes.
  self.setupServerRoutes()
  // renderFrontendFiles > Used to render all of the frontend files based on all the information from above.
  self.renderFrontendFiles()
  // updateFrontendCdn > Used to update the files based of if your using a cdn. We Support MAXCDN.
  self.updateFrontendCdn()
  // frontendFiles > Returns the files to send to the frontend
  return self.frontendFiles
}

```

#### Create a route
How it works

``` javascript
// test.routes.js
var test = require('./test.controller.js')
module.exports = function (app, auth, mail, settings) {
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
module.exports = function (app, auth, mail, settings) {
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
module.exports = function (app, auth, mail, settings) {
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