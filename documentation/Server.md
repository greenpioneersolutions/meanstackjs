#[Check Most Recent Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

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
  // grabs all options that might be sent in
  self.opts = opts
  // setup the ability to use debug
  self.debug = require('debug')('meanstackjs:server')
  // setup the environment, settings & dir variables
  self.setupEnv()
  // setup the app() and all of the core app.use()
  self.setupExpressConfigs()
  // setup the middleware that helps with security
  self.setupExpressSecurity()
  // setup the generic headers you want on every route
  self.setupHeaders()
  // setup the logger that will be used
  if (self.settings.logger)self.setupLogger()
  // opens the swagger api for the system / API documentation interface
  if (self.settings.swagger)self.swagger()
  // opens the routes to the agendash board to manage cron/agenda jobs
  if (self.settings.agendash.active) self.agenda()
  // if env = dev mode set up the night watch path annd plato path  
  if (self.environment === 'development') {
    self.nightwatch()
    self.plato()
  }
  // turns on livereload so that during dev time it will restart automatically
  self.livereload()
  // setup all of the routes & dynamically register all modules
  self.setupRoutesMiddleware()
  // setup our custom error handler
  self.setupErrorHandling()
  // setup all of our static routes like bower , images ... etc
  self.setupStatic()
  // final step is to turn mongodb and express on at the same time
  async.parallel({
    connectMongoDb: function (callback) {
      mongoose.Promise = Promise
      mongoose.set('debug', self.environment !== 'production')
      mongoose.connect(self.settings.mongodb.uri, self.settings.mongodb.options)
      mongoose.connection.on('error', function (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
        self.debug('MongoDB Connection Error ')
        callback(err, null)
      })
      mongoose.connection.on('open', function () {
        self.debug('MongoDB Connection Open ')
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
          self.debug('HTTPS Express server listening on port %d in %s mode', self.settings.https.port, self.app.get('env'))
        })
      }
      // OR - check if you set both to false we default to turn on http
      if (self.settings.http.active || (self.settings.https.active === false) === (self.settings.http.active === false)) {
        self.app.listen(self.app.get('port'), function () {
          console.log('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
          self.debug('HTTP Express server listening on port %d in %s mode', self.app.get('port'), self.app.get('env'))
        })
      }
      callback(null, {
        port: self.app.get('port'),
        env: self.app.get('env')
      })
    }
  },
    function (err, results) {
      if (err) {
        self.debug('Exiting because of error %d', err)
        process.exit(1)
      }
      done(null)
    })

  self.debug('Finished Server Load')


```

#### How Register.js Works
How it works

``` javascript

function Register (opts, done) {
  var self = this
  // get the environment info
  self.environment = require('./environment.js').get()
  // get the mail info to use anywhere
  self.mail = require('./mail.js')
  // set the express.app from the server.mean.js
  self.app = opts.app
  // set the settings of the app from the configs
  self.settings = opts.settings
  // set all the middleware to be used on any route
  self.middleware = opts.middleware
  // gather all info we from our module directories front & back
  self.info()
  // check and make all of the proper directories
  self.directories()
  // iterator over the info and place into proper variables for later use
  self.config()
  // if babel is set to active then transpile the backend coded as instructed
  self.transform()
  // take the variable from config and register mongoose models 
  self.createBackendModels()
  // take the variable from config and register express routes
  self.createBackendRoutes()
  // take the variable from config and compile global sass/less
  self.createGlobalStyle()
  /// take the variable from config and register all frontend files
  self.createFrontend()
  // last step - determine what should happen to the forntend based on env 
  // develop - serve the files as they are no extra actions
  // test - concat all of the js files
  // production - concat and then minify
  self.env()
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