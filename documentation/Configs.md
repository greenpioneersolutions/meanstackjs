### Settings.js

``` javascript
self.settings = require('./configs/settings.js').get()
self.settings = require('./configs/settings.js').set({
  'swagger':false
})
```

Note: assets are in reverse order of which there loaded

``` javascript
var baseLine = {
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
  // Template Engine
  templateEngine: 'swig',
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
  html: {
    googleAnalytics: 'UA-71654331-1',
    keywords: 'MEAN, MEANSTACKJS, mongodb, expressjs, angularjs,nodejs, javascript',
    description: 'The Meanstack js is a opensource framework that is made for and by developers'
  },
  seo: require('./seo.js'),
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
// Production example
module.exports = {
  html: {
    title: 'MEANSTACKJS'
  },
  logger: 'combined',
  buildreq: {
    console: false
  },
  mongoexpress: {
    port: process.env.MONGOEXPRESSPORT || 8081
  },
  socketio: {
    port: process.env.SOCKETIOPORT || 8282
  },
  http: {
    active: true,
    port: process.env.PORT || 80
  },
  https: {
    active: true,
    port: process.env.HTTPSPORT || 843,
    key: './configs/certificates/keyExample.pem',
    cert: './configs/certificates/certExample.pem'
  },
  mongodb: {
    uri: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'localhost') + '/prod',
    db: 'dev',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT_27017 || 27017,
    ssl: false,
    username: process.env.DB_USERNAME || '',
    /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
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
        address: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || process.env.MONGODB || process.env.MONGOLAB_URI || 'localhost') + '/prod'
      }
    }
  }
}

```