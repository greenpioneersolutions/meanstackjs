### Settings Usage

you can programmatically set it in your code. Recommended you just change it in the settings or env config 

``` javascript
self.settings = require('./configs/settings.js').get()
self.settings = require('./configs/settings.js').set({
  'swagger':false
})
```

### Seo.js

Example below of how totally control the seo of a dynamic route. In the hook if you chose to create one you have access to the `self` obj for the entire system, `data` object which will get sent to your templates & lastly if you need to call the callback to pass a error first or the data second. if there is a error the system will revert to the default seo. Note the data object will hold the values of the route before you do anything to it for example anything on the query or the params. In the env configs you can deem how you want to render by which template engine. Default - `lodash` which can handles es6 and ejs-like templating. If you wanted to you could switch right from the start to ejs and the templates are already compatible 

``` javascript
'/blog/view/:id': {
    title: '<%=  blog.title  %> -  <%=  blog.user.profile.name %> ',
    keywords: '<%=  blog.tags  %>',
    description: '<%=  blog.content  %> ',
    ogUrl: '<%=  path  %>',
    twitterUrl: '<%=  path  %>',
    canonical: '<%=  path  %>',
    ogTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    twitterTitle: '<%=  blog.title  %> -  <%=  blog.user.profile.name  %> ',
    ogDescription: '<%=  blog.content  %> ',
    twitterDescription: '<%=  blog.content  %> ',
    hook: function (self, data, cb) {
      data.blog = {
        tags: ['Add', 'Tags', 'To Blog', 'Mean Stack JS']
      }
      self.models.blog.findOne({_id: data.params.id}).populate('user').then(function (blog) {
        data.blog = _.assign(data.blog, blog)
        cb(null, data)
      }).catch(function (err) {
        cb(err)
      })
    }
  }
```
### Environment.js

``` javascript
self.environment = require('./server/environment.js').get()
self.environment = require('./server/environment.js').set('development')
// or by CMD
export NODE_ENV=test // LINUX
set NODE_ENE=test // WINDOWS
```

### Configs are based off env

``` javascript
// Development example
var mongodbUri = process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost/dev'
module.exports = {
  minify: 'default', // 'concat' all files or 'minify' concat and minfy  or 'default' leave as is
  html: {
    title: 'Development MEANSTACKJS'
  },
  logger: 'dev',
  cdn: process.env.CDN || false,
  buildreq: {
    console: true
  },
  maxcdn: {
    zoneId: process.env.MAXCDN_ZONE_ID || false
  },
  mongoexpress: {
    port: process.env.MONGOEXPRESSPORT || 8081
  },
  socketio: {
    port: process.env.SOCKETIOPORT || 8282
  },
  http: {
    active: true,
    port: process.env.PORT || 3000
  },
  https: {
    active: false,
    port: process.env.HTTPSPORT || 3043,
    key: './configs/certificates/keyExample.pem',
    cert: './configs/certificates/certExample.pem'
  },
  throttle: {
    rateLimit: {
      ttl: 600,
      max: 20000
    },
    mongoose: {
      uri: mongodbUri
    }
  },
  mongodb: {
    uri: mongodbUri,
    // Database options that will be passed directly to mongoose.connect
    // Below are some examples.
    // See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
    // and http://mongoosejs.com/docs/connections.html for more information

    options: {
      // server: {
      //   socketOptions: {
      //     keepAlive: 1
      //   },
      //   poolSize: 5
      // },
      // replset: {
      //   rs_name: 'myReplicaSet',
      //   poolSize: 5
      // },
      db: {
        w: 1,
        numberOfRetries: 2
      }
    }
  },
  agendash: {
    active: true,
    options: {
      db: {
        address: mongodbUri
      }
    }
  }
}

```

### Settings.js

We now have included [Dotenv](https://www.npmjs.com/package/dotenv) as you see below. In doing this it purposely fails silently because we want you to never source that info in github for security reasons. Please keep your configs safe and out of the public eye. `minify` is now configurable and no longer based on our env names so you have total control of your env names and how they build.

Note: assets are in reverse order of which there loaded

``` javascript
require('dotenv').config({silent: true})

var path = require('path')
var _ = require('lodash')
var environment = require('./environment.js').get()
var baseLine = {
  app: {
    name: 'MeanStackJS'
  },
  minify: 'default',
  render: {
    cli: 'lodash', // __ or ejs or lodash.
    seo: 'lodash', // ejs or lodash. default is lodash
    lodash: {
      options: {} // https://lodash.com/docs#template
    },
    ejs: {
      options: {} // https://www.npmjs.com/package/ejs#options
    }
  },
  env: environment,
  // Root path of server
  root: path.join(__dirname, '/../../..'),
  // Server IP
  ip: process.env.IP || '0.0.0.0',
  hostname: process.env.HOST || process.env.HOSTNAME || 'localhost',
  // Enable Swagger.io at localhost:[port]/api/
  swagger: true,
  // Enable the use of babel for ES6
  babel: {
    options: {
      // NOTE you must install the proper package to use here
      presets: [
        'babel-preset-es2015'
      ],
      plugins: [
        'transform-class-properties'
      ]
    },
    folder: 'dist',
    active: false
  },
  // Plato
  plato: {
    title: 'mean stack',
    eslint: {
      lastsemic: true,
      asi: true
    }
  },
  // JWT Object https://github.com/auth0/node-jsonwebtoken
  jwt: {
    // is used to compute a JWT SIGN
    secret: 'MEANSTACKJS',
    options: {
      expiresIn: 60 * 120 // 60 seconds * 120  = 2 hours
    }
  },
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
  sessionName: 'session.id',
  // Supports MAX CDN
  maxcdn: {
    companyAlias: process.env.MAXCDN_COMPANY_ALIAS || '',
    consumerKey: process.env.MAXCDN_CONSUMER_KEY || '',
    consumerSecret: process.env.MAXCDN_CONSUMER_SECRET || ''
  },
  // SEO - Default html setup
  googleAnalytics: 'UA-71654331-1',
  html: {
    title: 'Mean Stack JS Demo',
    keywords: 'MEAN, MEANSTACKJS, mongodb, expressjs, angularjs,nodejs, javascript',
    description: 'Mean Stack JS was built for ease of use with javascript at its core. MeanStackJS is a full stack javascript framework that will give you the power to develop web applications',
    ogUrl: 'https://meanstackjs.herokuapp.com/',
    ogType: 'website',
    ogTitle: 'Mean Stack JS Demo',
    ogDescription: 'Mean Stack JS was built for ease of use with javascript at its core. MeanStackJS is a full stack javascript framework that will give you the power to develop web applications',
    ogImage: 'http://meanstackjs.com/images/logo/header.png',
    fbAppId: '1610630462580116',
    twitterCreator: '@greenpioneerdev',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Mean Stack JS Demo',
    twitterDescription: 'Mean Stack JS was built for ease of use with javascript at its core. MeanStackJS is a full stack javascript framework that will give you the power to develop web applications',
    twitterUrl: 'https://meanstackjs.herokuapp.com/',
    twitterImage: 'http://meanstackjs.com/images/logo/header.png',
    twitterSite: '@meanstackjs',
    canonical: 'https://meanstackjs.herokuapp.com/',
    author: 'Green Pioneer Solutions'
  },
  seo: require('./seo.js'),
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
      '/bower_components/angular-jwt/dist/angular-jwt.js',
      '/bower_components/socket.io-client/socket.io.js',
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
      '/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      '/bower_components/angular/angular.js',
      '/bower_components/jquery/dist/jquery.js'
    ],
    css: [
      '/styles/compiled/global.style.css',
      '/bower_components/toastr/toastr.css'
    // '/bower_components/font-awesome/css/font-awesome.min.css'
    ]
  },
  bodyparser: {
    json: {limit: '100kb'},
    urlencoded: {limit: '100kb', extended: true}
  },
  helmet: {
    // https://github.com/helmetjs/helmet
  },
  expresValidator: {
    customValidators: {
      isArray: function (value) { // req.assert('param', 'Invalid Param').isArray()
        return _.isObject(value)
      },
      isObject: function (value) { // req.assert('param', 'Invalid Param').isObject()
        return _.isObject(value)
      },
      isString: function (value) { // req.assert('param', 'Invalid Param').isString()
        return _.isString(value)
      },
      isRegExp: function (value) { // req.assert('param', 'Invalid Param').isRegExp()
        return _.isRegExp(value)
      },
      isEmpty: function (value) { // req.assert('param', 'Invalid Param').isEmpty()
        return _.isEmpty(value)
      },
      gte: function (param, num) { // req.assert('param', 'Invalid Param').gte(5)
        return _.gte(param, num)
      },
      lte: function (param, num) { // req.assert('param', 'Invalid Param').lte(5)
        return _.lte(param, num)
      },
      gt: function (param, num) { // req.assert('param', 'Invalid Param').gt(5)
        return _.gt(param, num)
      },
      lt: function (param, num) { // req.assert('param', 'Invalid Param').lt(5)
        return _.lt(param, num)
      }
    },
    customSanitizers: {
      toArray: function (value) { // req.sanitize('postparam').toArray()
        return _.toArray(value)
      },
      toFinite: function (value) { // req.sanitize('postparam').toFinite()
        return _.toFinite(value)
      },
      toLength: function (value) { // req.sanitize('postparam').toLength()
        return _.toLength(value)
      },
      toPlainObject: function (value) { // req.sanitize('postparam').toPlainObject()
        return _.toPlainObject(value)
      },
      toString: function (value) { // req.sanitize('postparam').toString()
        return _.toString(value)
      }
    },
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
      var root = namespace.shift()
      var formParam = root

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']'
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      }
    }
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
  },
  email: {
    templates: {
      welcome: {
        subject: 'Welcome to Mean Stack JS',
        text: function (username) {
          return 'Hi ' + username + ',\n\n' +
          'Thanks for signing up for Mean Stack JS.\n\n' +
          'If you have any questions about the site, you can reply to this ' +
          'email.\n\n' +
          '— Mean Stack JS'
        }
      },
      reset: {
        subject: 'Reset your password on MEANSTACKJS ',
        text: function (email) {
          return 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + email + ' has just been changed.\n'
        }
      },
      forgot: {
        subject: 'Welcome to Mean Stack JS',
        text: function (host, token) {
          return 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }
      }
    },
    from: 'MEANSTACKJS@localhost.com',
    error: 'MEANSTACKJS@localhost.com',
    connect: {
      host: 'smtp.mandrillapp.com', // Gmail, SMTP
      port: '587',
      auth: {
        user: 'hackathonstarterdemo',
        pass: 'E1K950_ydLR4mHw12a0ldA'
      }
    }
  }
}
if (environment === 'test') {
  baseLine = _.assign(baseLine, require('./environments/test.js'))
} else if (environment === 'production') {
  baseLine = _.assign(baseLine, require('./environments/production.js'))
} else if (environment === 'nightwatch') {
  baseLine = _.assign(baseLine, require('./environments/nightwatch.js'))
} else {
  baseLine = _.assign(baseLine, require('./environments/development.js'))
}

exports.get = function (env) {
  return baseLine
}
exports.set = function (identifer, value) {
  baseLine[identifer] = value
  return baseLine
}

```


