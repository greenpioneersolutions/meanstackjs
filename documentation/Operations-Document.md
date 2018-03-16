
# Operation Document for meanstackjs - 1.10.0
## Table Of Contents<a name="TableOfContents"></a>

1. [Table Of Contents](#TableOfContents)
2. [Learn](#Learn)
    * MeanStackJS Info
        * Why Mean Stack JS
        * How to Learn Mean Stack JS
        * What is Mean Stack JS?
        * Pre-Requisites
    * Getting Started
        * Prerequisites: Option 1
        * Prerequisites: Option 2
        * Start
        * Testing
    * File Naming Structure
        * Modules
        * Available Keywords to use for 'FILE_TYPE_IDENTIFIER'
    * Folder Structure
        * Project Structure
        * Server Structure
        * Client Structure
    * Configs
        * Settings Usage
        * Seo.js
        * Environment.js
        * Configs are based off env
        * Settings.js
    * Client
        * Client Structure
        * Mean Stack JS Dependencies
        * File Structure
        * Frontend Modules
            * Adding a Module
            * Removing a Module
        * Styles
        * Angular Routes
        * Retrieving User Data and State
        * Logging and Alerts
        * Views
        * Form Validation
        * Adding Dependencies
        * Testing
        * Overview
        * Global.styles.scss
        * Module specific styling
        * Environment based compiling
    * Server
        * Server Structure
        * How Server.Mean.Js Works
        * How Register.js Works
        * Create a route
        * Create a route & pass arguments
        * Create a Model/Schema
        * Validate a Model/Schema
        * Create a Middleware
        * Create Pug Route
        * Create Test Spec
        * Send Mail
        * Get Settings
        * Add Swagger
        * Validate Route Params
    * Servers
        * server.mean.js
        * server.socketio.js
3. [API](#API)
4. [Tasks](#Tasks)
    * Errors
        * Where do we catch our errors ?
        * How do we log our errors
        * server.error.js:log - system error log
    * Testing
        * NPM Test / Everything
        * Nightwatch / E2E
        * Karma / Frontend
        * Mocha & Chai / Backend
        * Standard / JS Style
        * Need help installing?
    * Scripts
    * Command Line Interface (CLI)
    * Tools
        * Livereload
        * Mongo Express
        * Agenda
        * Swagger 
        * Plato
5. [Information](#Information)
    * Versions
        * Dependencies
        * Dev Dependencies
    * Frequently Asked Questions (FAQ)
        * 1. Error: listen EACCES 0.0.0.0
        * 2. Error: connect ECONNREFUSED 127.0.0.1:27017
        * 3. xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun
        * 4. Angularjs: Error: [ng:areq] Argument 'HomeController' is not a function, got undefined
    * Roadmap
        * Meanstackjs 1.x - Goal is to support Enterprises
        * Meanstackjs 2.x - Goal is to support Open Source Comp
    * Changelog




## Overview <a name="Overview"></a>


| Name        | Info           |
| ------------- |:-------------:|
| Date     | Fri Mar 16 2018 13:04:52 GMT-0500 (CDT) |
| Version     | 1.10.0 |
| Repository     | git+https://github.com/greenpioneersolutions/meanstackjs.git |
| homepage     | https://github.com/greenpioneersolutions/meanstackjs#readme |
| keywords     | Mean,Mean Stack,Mean Stack JS,Javascript framework,Mongodb,Expressjs,Express,Angular,Angularjs,Node,Nodejs,Meanstackjs,Greenpioneersolutions,Green Pioneer |
| author     | Green Pioneer <info@greenpioneersolutions.com> |
| contributors     | https://github.com/greenpioneersolutions/meanstackjs/graphs/contributors |
| license     | MIT |
| Bugs     | https://github.com/greenpioneersolutions/meanstackjs/issues |
| Tools     |  |
|   | agenda - 1.0.0|  
|   | livereload - 1.0.0|  
|   | mongo_express - 1.0.0|  
|   | nightwatch - 1.0.0|  
|   | plato - 1.0.0|  
|   | swagger - 1.0.0|  
### MeanStackJS Info
[![dependencies](https://david-dm.org/greenpioneersolutions/meanstackjs.svg)](https://david-dm.org/greenpioneersolutions/meanstackjs)
[![npm-issues](https://img.shields.io/github/issues/greenpioneersolutions/meanstackjs.svg)](https://github.com/greenpioneersolutions/meanstackjs/issues)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/greenpioneersolutions/meanstackjs.svg?branch=master)](https://travis-ci.org/greenpioneersolutions/meanstackjs)
[![Join the chat at https://gitter.im/greenpioneersolutions/meanstackjs](https://badges.gitter.im/greenpioneersolutions/meanstackjs.svg)](https://gitter.im/greenpioneersolutions/meanstackjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Known Vulnerabilities](https://snyk.io/test/github/greenpioneersolutions/meanstackjs/badge.svg)](https://snyk.io/test/github/greenpioneersolutions/meanstackjs/badge.svg)
[![Code Triagers Badge](https://www.codetriage.com/greenpioneersolutions/meanstackjs/badges/users.svg)](https://www.codetriage.com/greenpioneersolutions/meanstackjs)
[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/jasonhumphrey?utm_source=github&utm_medium=button&utm_term=jasonhumphrey&utm_campaign=github)
[![Donatee](https://img.shields.io/badge/paypal-donate-blue.svg)](https://paypal.me/greenpioneer)

[![meanstackjs Logo](http://meanstackjs.com/images/logo/header3x.png)](http://meanstackjs.com/)



#### Why Mean Stack JS

The best developers want to be efficient and productive, quickly prototyping and experimenting, able to build successes into production-ready applications. We believe Mean Stack JS gives developers of all skill levels—whether at enterprise scale or working solo—an ideal open-source toolset for building rapid, scalable Javascript applications. We'll provide you a simple project structure that is versatile enough to quickly apply to your own development projects. Want to get started?


#### How to Learn Mean Stack JS

Start learning with documentation:
* [Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

Start visualizing what the meanstack can do for you with our demo
* [Check Demo Here](https://meanstackjs.herokuapp.com/)

Check out this YouTube channel that has content to help you:
* [Subscribe to our Youtube Channel - MeanStackJs](https://www.youtube.com/channel/UC5lpSv5tNowgWxC9crTl97g)
* [Watch MeanStackJS - Releases](https://www.youtube.com/playlist?list=PLhJ-Q2setTdrhK1m0F1lUfZsIzBbw6wny)
* [Watch MeanStackJS - How to series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdqgwW6U39s_oMAehgtXa15O)
* [Watch MeanStackJS - Error series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdr19ha6bx7jt6Bu2RCM5c5_)
* [Watch MeanStackJS - What is series](https://www.youtube.com/playlist?list=PLhJ-Q2setTdpkHfA-mDMSjl4Wv-trKlY8)

For more control or something more basic, start here instead:
* [Lite Version](https://github.com/greenpioneersolutions/meanstackjs-lite)

For the Api version, start here instead:
* [Men Version](https://github.com/greenpioneersolutions/menstackjs)

Want more content?
* [LiveCoding.TV](https://www.livecoding.tv/greenpioneer/)
* [GPS Style Guide](https://github.com/greenpioneersolutions/gps-style-guide)
* [GPS Setup Guide](https://github.com/greenpioneersolutions/gps-setup-guide)
* [Roadmap](https://github.com/greenpioneersolutions/meanstackjs/wiki/Roadmap)

#### What is Mean Stack JS?

- [MongoDB](https://www.mongodb.org/) - MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
- [AngularJS](https://angularjs.org/) - based framework. -AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop
- [Node.js](http://www.nodejs.org/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications

[Check Demo Here](https://meanstackjs.herokuapp.com/)

[Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

#### Pre-Requisites

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started

[Check Documentation Here](https://github.com/greenpioneersolutions/meanstackjs/wiki)

[Check Demo Here](https://meanstackjs.herokuapp.com/)

[Check Roadmap Here](https://github.com/greenpioneersolutions/meanstackjs/wiki/Roadmap)

[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[node.js]: <http://nodejs.org>
[license]: http://showalicense.com/?fullname=Green%20Pioneer%20%3Cgreen%40greenpioneersolutions.com%3E&year=2016#license-mit
[website]: http://greenpioneersolutions.com/

## Learn <a name="Learn"></a>
### Getting Started

#### Prerequisites: Option 1

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting.
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.

#### Prerequisites: Option 2

Download our repo & run CLI - NOTE: not for windows users. Please use the links above to install

We have built in all of the installs in our system to help new users or to help people install in cloud envs.

``` bash
npm run cli
# select - Mean Stack JS Install Dependencies
# the select - Install MongoDB
# in a new window or tab select - Start Mongod
```
#### Start

The easiest way to get started is to clone the repository:

``` bash
# Get the latest snapshot
git clone https://github.com/greenpioneersolutions/meanstackjs.git

# Change directory
cd meanstackjs

# Install NPM dependencies
npm install

# Start up the server
npm start
# or
node index.js
# or
nodemon index.js
```

#### Testing

Easiest way to start testing your whole system 

``` bash
npm run cli
# select - Install Selenium Server
# once installed - Start Selenium Server
npm test
```

Note you must have mongodb running and if you dont then 
``` bash
npm run cli
# the select - Install MongoDB
# in a new window or tab select - Start Mongod
```
### File Naming Structure


#### Modules

We have implemented modules with a specific file naming convention for server & client side coding. Each module has a unique such as `blog`. Inside of each module you specific files named as such `UNIQUE_NAME.FILE_TYPE_IDENTIFIER.FILE_EXTENSION` 

#### Available Keywords to use for `FILE_TYPE_IDENTIFIER`

| FRONTEND                                | BACKEND                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| `module` | `models` |
| `controller` | `controller` |
| `routes` | `routes` |
| `config` | `spec` |
| `service` | |
| `provider` | |
| `directive` | |
| `style` | |
| `json` | |
| `view` | |
| `spec` | |

Once everything is set up properly we then register all modules and all of its content appropriately on `server.js` startup. 


Examples on the frontend include :

- `blog.controller.js`
- `email.controller.js`
- `blog.factory.js`
- `auth.factory.js`
- `blog.module.js`
- `blog.routes.js.js`
- `blog.spec.css`
- `blog.style.css`
- `blog.style.scss`
- `list.style.less`
- `create.view.html`

Examples on the backend  include :

- `blog.controller.js`
- `blog.model.js`
- `blog.routes.js`
- `blog.spec.js`


### Folder Structure

#### Project Structure

| Name                                | Description                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| **client**/                         | Folder:all public frontend files                             |
| **commands**/                       | Folder:all Meanstackjs CLI                                   |
| **configs**/                        | Folder:all configuration files                               |
| **database**/                       | Folder:all database files if you install through our cli     |
| **documentation**/                  | Folder:all documentation files                               |
| **downloads**/                      | Folder:all downloaded files if you install anything in cli   |
| **node_modules**/                   | Folder:node js modules                                       |
| **scripts**/                        | Folder:all scripts files you or our cli will use             |
| **server**/                         | Folder:all private backend files                             |
| **tools**/                          | Folder:all meanstackjs tools ex. agenda,livereload ...etc    |
| **.bowerrc**                        | Bower configuration                                          |
| **.gitignore**                      | Files and Folders to ignore with GIT                         |
| **bower.json**                      | Frontend library dependencies                                |
| **index.js**                        | Main server file that will run the system                    |
| **package.json**                    | NodeJS configuration                                         |
| **README.md**                       | Documentation                                                |
| **run.js**                          | Used to run/start any server you create ex.mean or socketio  |
| **server.mean.js**                  | Mean server file that uses server folder                     |
| **server.socketio.js**              | Socketio server file that is independent of everything       |

#### Server Structure

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

#### Client Structure

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **client**/bower_components/       | Folder:all frontend dependencies                             |
| **client**/images/                 | Folder:all Global images                                     |
| **client**/modules/                | Folder:all dynamic modules to run mean stack js              |
| **client**/styles/                 | Folder:all Global styles                                     |
| **client**/uploads/                | Folder:all Global uploads                                    |


### Configs

#### Settings Usage

you can programmatically set it in your code. Recommended you just change it in the settings or env config 

``` javascript
self.settings = require('./configs/settings.js').get()
self.settings = require('./configs/settings.js').set({
  'swagger':false
})
```

#### Seo.js

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
#### Environment.js

``` javascript
self.environment = require('./server/environment.js').get()
self.environment = require('./server/environment.js').set('development')
// or by CMD
export NODE_ENV=test // LINUX
set NODE_ENE=test // WINDOWS
```

#### Configs are based off env

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

#### Settings.js

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
  // components -  Needs to be manually added below
  // modules - aggregated automatically
  // images - manually called in files
  // styles - manually called  & automatically compiles the global style scss in COMPILED Folder
  // uploads - Automatic uploads to be manually called in the files
  // USE EXTERNAL FILES - 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
  // OR USE INTERNAL FILES - '/bower_components/jquery/dist/jquery.js'
  assets: {
    js: [
      '/angular-jwt/dist/angular-jwt.js',
      '/socket.io-client/socket.io.js',
      '/ng-file-upload/dist/ng-file-upload-all.js',
      '/angular-mocks/angular-mocks.js',
      '/angular-cookies/angular-cookies.js',
      '/angular-sanitize/angular-sanitize.js',
      '/angular-animate/angular-animate.js',
      '/angular-resource/angular-resource.js',
      '/angular-ui-router/release/angular-ui-router.js',
      '/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      '/angular-moment/angular-moment.js',
      '/moment/moment.js',
      '/lodash/lodash.js',
      '/toastr/toastr.js',
      '/bootstrap-sass/assets/javascripts/bootstrap.js',
      '/angular/angular.js',
      '/jquery/dist/jquery.js'
    ],
    css: [
      '/styles/compiled/global.style.css',
      '/toastr/build/toastr.css'
    ],
    copy: [
      '/font-awesome/fonts/fontawesome-webfont.woff2',
      '/font-awesome/fonts/fontawesome-webfont.ttf'
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



### Client

#### Client Structure

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **client**/bower_components/       | Folder:all frontend dependencies                             |
| **client**/images/                 | Folder:all Global images                                     |
| **client**/modules/                | Folder:all dynamic modules to run mean stack js              |
| **client**/styles/                 | Folder:all Global styles                                     |
| **client**/uploads/                | Folder:all Global uploads                                    |


#### Mean Stack JS Dependencies
Client dependencies should be available after first running `npm install`. They may also be installed or updated at any time using `bower install`. For more options check out the [bower web site](http://bower.io).

#### File Structure
Because Mean Stack JS follows the principle of separation of concerns, all client-side files are stored under the `/client` directory in the root directory.  Within this directory are several subdirectories containing the following:

| Directory |Contents|
|-----|---|
| bower_components | Front-end dependencies managed through bower |                                                                            
| images           | Global images|                                                                                                     
| modules          | Subdirectories of modules containing development files for javascript, HTML markup, and stylesheets - this is where most work will be done    |
| scripts          | Compiled javascript for production use |                                             
| styles           | Global styles and compiled css for production use  |                                            
| uploads          | Files uploaded by users  |                                                                                                                     

#### Frontend Modules
Mean Stack JS comes with several modules included to create a starting point for most projects.  

* [Core] - Main module that pulls everything together
* [User] - User Management
* [Blog] - Example Blog Module
* [Header] - Module for navigation and content in the header tag
* [Footer] - Module for content in the footer tag
* [Index] - Homepage module

##### Adding a Module
Modules can be quickly and conveniently generated by the CLI tool built into Mean Stack JS. Simply run `npm run cli` and answer a few basic questions to create only frontend modules or both frontend and backend modules.  The CLI tool will generate views, controllers, services, and test files to create a working baseline for a CRUD (create, read, update, delete) module. Otherwise, modules may also be created manually in the modules directory using the the naming scheme for new files that is used for built-in module files.

*Note*: When creating new modules or module files the server must be restarted in order for the new files to be served. 

##### Removing a Module
Modules may be removed by deleting the module directory or moving it out of the project directory.

#### Styles
Because Mean Stack JS is preprocessor-agnostic, [SASS](http://sass-lang.com), [LESS](http://lesscss.org), and vanilla CSS are all available for use (even together!) and will be automatically compiled and saved in the `/client/styles/compiled` directory when style files are changed while the server is running. Module-specific styles live in their respective module directory while global styles are located in the `/client/styles` directory.

#### Angular Routes
Client-side routes can be found in the `moduleName.routes.js` file in a module directory. A router helper  provider is used to simplify angular routing. All routes use [ui-router](https://github.com/angular-ui/ui-router) and must follow the ui-router api. A route/state may be added by adding an object in the following format to the array:
```javascript
{
    state: 'create',
    config: {
        url: '/blog/create',
        templateUrl: 'modules/blog/create.view.html',
        controller: 'BlogController',
        controllerAs: 'vm',
        resolve: {
            loggedin: function (UserFactory) {
                return UserFactory.checkLoggedin()
            }
        }
    }
},
```

#### Retrieving User Data and State
`UserFactory` can be injected into any controller or service to provide needed information. A simple set of properties satisfies most use cases.

| Property         | Description                                                                  |
|------------------|------------------------------------------------------------------------------|
| user             | Object: Contains email, profile, and roles if logged in, empty if logged out |
| loggedin         | True if logged in, false if logged out                                       |
| isAdmin          | True if user is an admin, false if not                                       |
| checkLoggedOut() | Used to check if the user is logged out                                      |
| checkLoggedin()  | Used to check if the user is logged in                                       |
| checkAdmin()     | Used to check if the user has admin role                                     |

`UserFactory` may also be assigned to the view-model within a controller for use in views like so.
```javascript
// In controller
vm.UserFactory = UserFactory;
```
```html
<!-- In view -->
<p ng-show=”vm.UserFactory.loggedin”>
	Hello, {{vm.UserFactory.user.profile.name }}!
</p>
```

#### Logging and Alerts
[Toastr](http://toastrjs.com) is included in Mean Stack JS and is used to display a visual alert to the user while at the same time outputting more detailed information to the browser’s console. To use this feature, simply inject `logger` into your controller or service to use the simple api. Its error, info, success, and warning methods all take the same arguments in this order: message – type *string*, data – type *any*, title – type *string*.
```javascript
logger.warning('Data not valid', vm, 'Blog Post Validation')
```

#### Views
Client views are located in module directories and are suffixed with `.view.html`. By default, Mean Stack JS includes both a header and a footer.  The parent view of the single-page application is held in the core module’s view. It includes the header and footer using angular’s `ng-include` directive.  The homepage view is located in the index module while 404 and 505 error page views are located in the core module.

#### Form Validation
Views and controllers for the built-in blog and user modules include validation. User passwords by default must be at least six characters and contain at least one letter, one number, and one symbol. Basic validation is included for form inputs in CLI generated views and controllers. 

#### Adding Dependencies
Additional dependencies can be added with the use of bower.  
```bash
bower install package-name --save
```
Dependencies may also be manually saved in the `/client` directory. In any case, paths to the dependency files must then be saved in the assets object inside `/configs/settings.js` using the file's path relative to the `/client` directory. Another option is adding a file url (eg. libraries accessed through a CDN) in the assets object .

*Note*: After the addition of any dependencies the server must be restarted for the new files to be served.

#### Testing
[Mocha](https://mochajs.org) and [Chai](http://chaijs.com) are the default testing and assertion libraries used for frontend unit tests with [karma](https://karma-runner.github.io/0.13/index.html) as the test runner. The CLI tool generates tests with passing test cases when a frontend module is created. Test files reside in their respective module directories with the filename suffix `.spec.js`.  To run unit tests simply run `npm run karma` in the command line.

End-to-end tests are run using [Nightwatch](http://nightwatchjs.org) with test files located in `/tests/e2e`. They can be run using `npm run nightwatch` in the command line.

Mean Stack JS follows the [JavaScript Standard Style](http://standardjs.com). Testing javascript files to make sure they follow this standard can be done by running `npm run standard` in the command line.

All of the above tests can be run at once using `npm test`.



Theming Styling
-----------------

#### Overview
We've set up this framework to automatically aggregate, compile and reference all styling files likes css, scss and less. You can use any of the styling syntax. We don't care. We made it easy for you to get going and style it out. Although we prefer usage of scss.

We wanted this mean framework to be UI framework agnostic. Meaning anyone should be able to choose different UI frameworks that suits their cup of tea and needs. We've used bootstrap as an example. Frameworks like bootstrap, zurb foundation and material interchangeable. The mean framework is not dependent on them.


#### Global.styles.scss
This is the file where most of the magic will happen. This is where you will import framework styles, import custom variables override UI framework variables and define sitewide styles to create your custome theme.


#### Module specific styling
In each module you can include a .scss file. This is where you can define module specific styles so that you can easily debug and change styles in development.

#### Environment based compiling
As you get to a solid code base. We want some optimized code and file size. Setting the mean framework into a production state will compile and minify all the styling files.

For development module.style files will be compliled and referenced independently. Making it easy debug and find where the styling code is.


### Server

#### Server Structure

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

var emailValidator = [
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
var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [ 6, 255 ],
    message: 'Your password must be at least 6 characters.'
  })
]
var profileNameValidator = [
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
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'We need an email address to create your account.',
    validate: emailValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  },
  tokens: {
    type: Array
  },
  roles: {
    type: Array,
    default: []
  },
  profile: {
    name: {
      type: String,
      index: true,
      required: 'We need a name to create your account.',
      validate: passwordValidator
    },
    gender: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    }
  },
  // azure: {},
  // facebook: {},
  // twitter: {},
  // github: {},
  // google: {},
  // linkedin: {},
  // instagram: {},
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  apikey: {
    type: String,
    default: uuid.v4()
  },
  type: {
    type: String,
    default: 'user' // Service Accounts later
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
### Servers

#### server.mean.js

Purpose: This is the main server file that runs our entire backend logic our of the server folder

#### server.socketio.js

Purpose: This is the socketio server file that aims to make realtime apps possible in every browser and mobile device, blurring the differences between the different transport mechanisms.






<a name="API"></a>

## API 


<details><summary>/api/admin/users - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsers(req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password -apikey')
    .exec(function (error, users) {
      if (error) return next(error)
      debug('end getUsers')
      return res.send(users)
    })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - GET</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsersById(req, res, next) {
  res.send(req.adminUser)
}
```

</p>
</details>

<details><summary>/api/admin/users - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postUsers(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Users.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - PUT</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putUsers(req, res, next) {
  req.adminUser = _.assign(req.adminUser, req.body)
  req.adminUser.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.adminUser)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - DELETE</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteUsers(req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrors(req, res, next) {
  auto({
    errors: function (cb) {
      Errors
        .find()
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .select('-password')
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.errors)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - GET</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrorsById(req, res, next) {
  res.send(req.error)
}
```

</p>
</details>

<details><summary>/api/admin/errors - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postErrors(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - PUT</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putErrors(req, res, next) {
  req.error = _.assign(req.error, req.body)
  req.error.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.error)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - DELETE</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteErrors(req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/logs/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function (req, res, next) {
    logger.query({
      from: req.query.from || (new Date() - 24 * 60 * 60 * 1000),
      until: req.query.until || new Date(),
      limit: req.query.limit || 10,
      start: req.query.start || 0,
      order: req.query.order || 'desc',
      fields: req.query.fields || undefined
    }, function (error, results) {
      if (error) return next(error)
      if (req.query.select) return res.status(200).send(results[req.query.select])
      return res.status(200).send(results)
    })
  }
```

</p>
</details>

<details><summary>/api/blog/ - GET</summary>
<p>

#### Description 
  Blog operations







#### Code

```javascript
function getBlog(req, res, next) {
  debug('start getBlog')
  auto({
    blogs: function (cb) {
      debug(req.queryParameters)
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .select(req.queryParameters.select || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .count()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    debug('end getBlog')
    return res.status(200).send(results)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - GET</summary>
<p>



#### Params 
* blogId - **Required** 





#### Code

```javascript
function getBlogById(req, res, next) {
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}
```

</p>
</details>

<details><summary>/api/blog - POST</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function postBlog(req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  blogs.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - PUT</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function putBlog(req, res, next) {
  req.blog = _.assign(req.blog, req.body)
  req.blog.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.blog)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - DELETE</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function deleteBlog(req, res, next) {
  req.blog.remove(function (error) {
    if (error) return next(error)
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/testing/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
```

</p>
</details>

<details><summary>/api/settings/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.send(require('pug').renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
```

</p>
</details>

<details><summary>/api/system/status - GET</summary>
<p>








#### Code

```javascript
function status(req, res, next) {
  res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/photos/upload - POST</summary>
<p>





#### Middleware

<details><summary>multerMiddleware</summary>
<p>

```javascript
function multerMiddleware(req, res, next) {
    if (!is(req, ['multipart'])) return next()

    var options = setup()

    var limits = options.limits
    var storage = options.storage
    var fileFilter = options.fileFilter
    var fileStrategy = options.fileStrategy
    var preservePath = options.preservePath

    req.body = Object.create(null)

    var busboy

    try {
      busboy = new Busboy({ headers: req.headers, limits: limits, preservePath: preservePath })
    } catch (err) {
      return next(err)
    }

    var appender = new FileAppender(fileStrategy, req)
    var isDone = false
    var readFinished = false
    var errorOccured = false
    var pendingWrites = new Counter()
    var uploadedFiles = []

    function done (err) {
      if (isDone) return
      isDone = true

      req.unpipe(busboy)
      drainStream(req)
      busboy.removeAllListeners()

      onFinished(req, function () { next(err) })
    }

    function indicateDone () {
      if (readFinished && pendingWrites.isZero() && !errorOccured) done()
    }

    function abortWithError (uploadError) {
      if (errorOccured) return
      errorOccured = true

      pendingWrites.onceZero(function () {
        function remove (file, cb) {
          storage._removeFile(req, file, cb)
        }

        removeUploadedFiles(uploadedFiles, remove, function (err, storageErrors) {
          if (err) return done(err)

          uploadError.storageErrors = storageErrors
          done(uploadError)
        })
      })
    }

    function abortWithCode (code, optionalField) {
      abortWithError(makeError(code, optionalField))
    }

    // handle text field data
    busboy.on('field', function (fieldname, value, fieldnameTruncated, valueTruncated) {
      if (fieldnameTruncated) return abortWithCode('LIMIT_FIELD_KEY')
      if (valueTruncated) return abortWithCode('LIMIT_FIELD_VALUE', fieldname)

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      appendField(req.body, fieldname, value)
    })

    // handle files
    busboy.on('file', function (fieldname, fileStream, filename, encoding, mimetype) {
      // don't attach to the files object, if there is no file
      if (!filename) return fileStream.resume()

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      var file = {
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimetype
      }

      var placeholder = appender.insertPlaceholder(file)

      fileFilter(req, file, function (err, includeFile) {
        if (err) {
          appender.removePlaceholder(placeholder)
          return abortWithError(err)
        }

        if (!includeFile) {
          appender.removePlaceholder(placeholder)
          return fileStream.resume()
        }

        var aborting = false
        pendingWrites.increment()

        Object.defineProperty(file, 'stream', {
          configurable: true,
          enumerable: false,
          value: fileStream
        })

        fileStream.on('error', function (err) {
          pendingWrites.decrement()
          abortWithError(err)
        })

        fileStream.on('limit', function () {
          aborting = true
          abortWithCode('LIMIT_FILE_SIZE', fieldname)
        })

        storage._handleFile(req, file, function (err, info) {
          if (aborting) {
            appender.removePlaceholder(placeholder)
            uploadedFiles.push(extend(file, info))
            return pendingWrites.decrement()
          }

          if (err) {
            appender.removePlaceholder(placeholder)
            pendingWrites.decrement()
            return abortWithError(err)
          }

          var fileInfo = extend(file, info)

          appender.replacePlaceholder(placeholder, fileInfo)
          uploadedFiles.push(fileInfo)
          pendingWrites.decrement()
          indicateDone()
        })
      })
    })

    busboy.on('error', function (err) { abortWithError(err) })
    busboy.on('partsLimit', function () { abortWithCode('LIMIT_PART_COUNT') })
    busboy.on('filesLimit', function () { abortWithCode('LIMIT_FILE_COUNT') })
    busboy.on('fieldsLimit', function () { abortWithCode('LIMIT_FIELD_COUNT') })
    busboy.on('finish', function () {
      readFinished = true
      indicateDone()
    })

    req.pipe(busboy)
  }
```

</p>
</details>



#### Code

```javascript
function postPhoto(req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        debug('end postPhoto')
        return res.status(400).send(error)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (error) {
        if (error) {
          debug('end postPhoto')
          return res.status(400).send(error)
        } else {
          debug('end postPhoto')
          return res.status(201).send()
        }
      })
    })
  } else {
    debug('end postPhoto')
    return res.status(400).send()
  }
}
```

</p>
</details>

<details><summary>/api/user/authenticate - POST</summary>
<p>

#### Description 
  Authentication route




#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postAuthenticate(req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}
```

</p>
</details>

<details><summary>/api/user/authenticate - GET</summary>
<p>

#### Description 
  Check Authentication
#### Method 
  get







#### Code

```javascript
function getAuthenticate(req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (error, user) {
      if (error) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}
```

</p>
</details>

<details><summary>/api/user/logout - POST</summary>
<p>








#### Code

```javascript
function logout(req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/forgot - POST</summary>
<p>








#### Code

```javascript
function postForgot(req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (error, buf) {
        var token = buf.toString('hex')
        done(error, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (error, user) {
        if (error) {
          debug('end postForgot')
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (error) {
          callback(error, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (error) {
        callback(error, true)
      })
    }]
  }, function (error) {
    if (error) {
      return next(error)
    }
    debug('end postForgot')
    return res.status(200).send({ message: 'Email has been sent' })
  })
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - GET</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function getReset(req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      message: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (error, user) {
        if (error) {
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          message: 'token is valid',
          valid: true
        })
      })
  }
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - POST</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function postReset(req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({message: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (error, user) {
            if (error) {
              return next(error)
            }
            if (!user) {
              return res.status(400).send({message: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (error) {
              if (error) {
                return next(error)
              }
              req.logIn(user, function (error) {
                callback(error, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (error) {
          callback(error, true)
        })
      }]
    }, function (error, user) {
      if (error) {
        return next(error)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}
```

</p>
</details>

<details><summary>/api/user/signup - POST</summary>
<p>








#### Code

```javascript
function postSignup(req, res, next) {
  debug('start postSignup')

  req.assert('profile', 'Name must not be empty').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  var redirect = req.body.redirect || false
  if (errors) {
    debug('end postSignup')
    return res.status(400).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signup'
    })
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.profile.name
    }
  })

  User.findOne({ email: req.body.email }, function (error, existingUser) {
    if (error) {
      return res.status(400).send(error)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ message: 'Account with that email address already exists.' })
    }
    user.save(function (error) {
      if (error && error.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ message: 'Account with that email address already exists.' })
      } else if (error && error.name === 'ValidationError') {
        var keys = _.keys(error.errors)
        debug('end postSignup')
        return res.status(400).send({ message: error.errors[keys[0]].message }) // error.message
      } else if (error) {
        next(error)
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error)
          } else {
            delete user['password']
            var token = tokenApi.createKey(user)
            res.cookie('token', token)
            debug('end postSignup')
            return res.status(200).send(exports.createResponseObject(user, token, redirect))
          }
        })
      }
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/profile - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdateProfile(req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user = _.assign(user, req.body)
    user.save(function (error) {
      if (error) {
        return next(error)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/password - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdatePassword(req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user.password = req.body.password
    user.save(function (error) {
      if (error) {
        return next(error)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/delete - DELETE</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteDeleteAccount(req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (error) {
    if (error) {
      return next(error)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}
```

</p>
</details>

<details><summary>/api/user/token - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKey(req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}
```

</p>
</details>

<details><summary>/api/user/token - POST</summary>
<p>





#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postKey(req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}
```

</p>
</details>

<details><summary>/api/user/token/reset - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKeyReset(req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (error) {
    debug('start getKeyReset')
    if (error) return res.status(500).send(error)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}
```

</p>
</details>

<details><summary>/api/admin/users - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsers(req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password -apikey')
    .exec(function (error, users) {
      if (error) return next(error)
      debug('end getUsers')
      return res.send(users)
    })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - GET</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsersById(req, res, next) {
  res.send(req.adminUser)
}
```

</p>
</details>

<details><summary>/api/admin/users - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postUsers(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Users.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - PUT</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putUsers(req, res, next) {
  req.adminUser = _.assign(req.adminUser, req.body)
  req.adminUser.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.adminUser)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - DELETE</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteUsers(req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrors(req, res, next) {
  auto({
    errors: function (cb) {
      Errors
        .find()
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .select('-password')
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.errors)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - GET</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrorsById(req, res, next) {
  res.send(req.error)
}
```

</p>
</details>

<details><summary>/api/admin/errors - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postErrors(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - PUT</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putErrors(req, res, next) {
  req.error = _.assign(req.error, req.body)
  req.error.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.error)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - DELETE</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteErrors(req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/logs/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function (req, res, next) {
    logger.query({
      from: req.query.from || (new Date() - 24 * 60 * 60 * 1000),
      until: req.query.until || new Date(),
      limit: req.query.limit || 10,
      start: req.query.start || 0,
      order: req.query.order || 'desc',
      fields: req.query.fields || undefined
    }, function (error, results) {
      if (error) return next(error)
      if (req.query.select) return res.status(200).send(results[req.query.select])
      return res.status(200).send(results)
    })
  }
```

</p>
</details>

<details><summary>/api/blog/ - GET</summary>
<p>

#### Description 
  Blog operations







#### Code

```javascript
function getBlog(req, res, next) {
  debug('start getBlog')
  auto({
    blogs: function (cb) {
      debug(req.queryParameters)
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .select(req.queryParameters.select || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .count()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    debug('end getBlog')
    return res.status(200).send(results)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - GET</summary>
<p>



#### Params 
* blogId - **Required** 





#### Code

```javascript
function getBlogById(req, res, next) {
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}
```

</p>
</details>

<details><summary>/api/blog - POST</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function postBlog(req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  blogs.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - PUT</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function putBlog(req, res, next) {
  req.blog = _.assign(req.blog, req.body)
  req.blog.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.blog)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - DELETE</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function deleteBlog(req, res, next) {
  req.blog.remove(function (error) {
    if (error) return next(error)
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/testing/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
```

</p>
</details>

<details><summary>/api/settings/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.send(require('pug').renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
```

</p>
</details>

<details><summary>/api/system/status - GET</summary>
<p>








#### Code

```javascript
function status(req, res, next) {
  res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/photos/upload - POST</summary>
<p>





#### Middleware

<details><summary>multerMiddleware</summary>
<p>

```javascript
function multerMiddleware(req, res, next) {
    if (!is(req, ['multipart'])) return next()

    var options = setup()

    var limits = options.limits
    var storage = options.storage
    var fileFilter = options.fileFilter
    var fileStrategy = options.fileStrategy
    var preservePath = options.preservePath

    req.body = Object.create(null)

    var busboy

    try {
      busboy = new Busboy({ headers: req.headers, limits: limits, preservePath: preservePath })
    } catch (err) {
      return next(err)
    }

    var appender = new FileAppender(fileStrategy, req)
    var isDone = false
    var readFinished = false
    var errorOccured = false
    var pendingWrites = new Counter()
    var uploadedFiles = []

    function done (err) {
      if (isDone) return
      isDone = true

      req.unpipe(busboy)
      drainStream(req)
      busboy.removeAllListeners()

      onFinished(req, function () { next(err) })
    }

    function indicateDone () {
      if (readFinished && pendingWrites.isZero() && !errorOccured) done()
    }

    function abortWithError (uploadError) {
      if (errorOccured) return
      errorOccured = true

      pendingWrites.onceZero(function () {
        function remove (file, cb) {
          storage._removeFile(req, file, cb)
        }

        removeUploadedFiles(uploadedFiles, remove, function (err, storageErrors) {
          if (err) return done(err)

          uploadError.storageErrors = storageErrors
          done(uploadError)
        })
      })
    }

    function abortWithCode (code, optionalField) {
      abortWithError(makeError(code, optionalField))
    }

    // handle text field data
    busboy.on('field', function (fieldname, value, fieldnameTruncated, valueTruncated) {
      if (fieldnameTruncated) return abortWithCode('LIMIT_FIELD_KEY')
      if (valueTruncated) return abortWithCode('LIMIT_FIELD_VALUE', fieldname)

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      appendField(req.body, fieldname, value)
    })

    // handle files
    busboy.on('file', function (fieldname, fileStream, filename, encoding, mimetype) {
      // don't attach to the files object, if there is no file
      if (!filename) return fileStream.resume()

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      var file = {
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimetype
      }

      var placeholder = appender.insertPlaceholder(file)

      fileFilter(req, file, function (err, includeFile) {
        if (err) {
          appender.removePlaceholder(placeholder)
          return abortWithError(err)
        }

        if (!includeFile) {
          appender.removePlaceholder(placeholder)
          return fileStream.resume()
        }

        var aborting = false
        pendingWrites.increment()

        Object.defineProperty(file, 'stream', {
          configurable: true,
          enumerable: false,
          value: fileStream
        })

        fileStream.on('error', function (err) {
          pendingWrites.decrement()
          abortWithError(err)
        })

        fileStream.on('limit', function () {
          aborting = true
          abortWithCode('LIMIT_FILE_SIZE', fieldname)
        })

        storage._handleFile(req, file, function (err, info) {
          if (aborting) {
            appender.removePlaceholder(placeholder)
            uploadedFiles.push(extend(file, info))
            return pendingWrites.decrement()
          }

          if (err) {
            appender.removePlaceholder(placeholder)
            pendingWrites.decrement()
            return abortWithError(err)
          }

          var fileInfo = extend(file, info)

          appender.replacePlaceholder(placeholder, fileInfo)
          uploadedFiles.push(fileInfo)
          pendingWrites.decrement()
          indicateDone()
        })
      })
    })

    busboy.on('error', function (err) { abortWithError(err) })
    busboy.on('partsLimit', function () { abortWithCode('LIMIT_PART_COUNT') })
    busboy.on('filesLimit', function () { abortWithCode('LIMIT_FILE_COUNT') })
    busboy.on('fieldsLimit', function () { abortWithCode('LIMIT_FIELD_COUNT') })
    busboy.on('finish', function () {
      readFinished = true
      indicateDone()
    })

    req.pipe(busboy)
  }
```

</p>
</details>



#### Code

```javascript
function postPhoto(req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        debug('end postPhoto')
        return res.status(400).send(error)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (error) {
        if (error) {
          debug('end postPhoto')
          return res.status(400).send(error)
        } else {
          debug('end postPhoto')
          return res.status(201).send()
        }
      })
    })
  } else {
    debug('end postPhoto')
    return res.status(400).send()
  }
}
```

</p>
</details>

<details><summary>/api/user/authenticate - POST</summary>
<p>

#### Description 
  Authentication route




#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postAuthenticate(req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}
```

</p>
</details>

<details><summary>/api/user/authenticate - GET</summary>
<p>

#### Description 
  Check Authentication
#### Method 
  get







#### Code

```javascript
function getAuthenticate(req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (error, user) {
      if (error) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}
```

</p>
</details>

<details><summary>/api/user/logout - POST</summary>
<p>








#### Code

```javascript
function logout(req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/forgot - POST</summary>
<p>








#### Code

```javascript
function postForgot(req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (error, buf) {
        var token = buf.toString('hex')
        done(error, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (error, user) {
        if (error) {
          debug('end postForgot')
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (error) {
          callback(error, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (error) {
        callback(error, true)
      })
    }]
  }, function (error) {
    if (error) {
      return next(error)
    }
    debug('end postForgot')
    return res.status(200).send({ message: 'Email has been sent' })
  })
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - GET</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function getReset(req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      message: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (error, user) {
        if (error) {
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          message: 'token is valid',
          valid: true
        })
      })
  }
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - POST</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function postReset(req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({message: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (error, user) {
            if (error) {
              return next(error)
            }
            if (!user) {
              return res.status(400).send({message: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (error) {
              if (error) {
                return next(error)
              }
              req.logIn(user, function (error) {
                callback(error, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (error) {
          callback(error, true)
        })
      }]
    }, function (error, user) {
      if (error) {
        return next(error)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}
```

</p>
</details>

<details><summary>/api/user/signup - POST</summary>
<p>








#### Code

```javascript
function postSignup(req, res, next) {
  debug('start postSignup')

  req.assert('profile', 'Name must not be empty').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  var redirect = req.body.redirect || false
  if (errors) {
    debug('end postSignup')
    return res.status(400).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signup'
    })
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.profile.name
    }
  })

  User.findOne({ email: req.body.email }, function (error, existingUser) {
    if (error) {
      return res.status(400).send(error)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ message: 'Account with that email address already exists.' })
    }
    user.save(function (error) {
      if (error && error.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ message: 'Account with that email address already exists.' })
      } else if (error && error.name === 'ValidationError') {
        var keys = _.keys(error.errors)
        debug('end postSignup')
        return res.status(400).send({ message: error.errors[keys[0]].message }) // error.message
      } else if (error) {
        next(error)
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error)
          } else {
            delete user['password']
            var token = tokenApi.createKey(user)
            res.cookie('token', token)
            debug('end postSignup')
            return res.status(200).send(exports.createResponseObject(user, token, redirect))
          }
        })
      }
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/profile - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdateProfile(req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user = _.assign(user, req.body)
    user.save(function (error) {
      if (error) {
        return next(error)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/password - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdatePassword(req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user.password = req.body.password
    user.save(function (error) {
      if (error) {
        return next(error)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/delete - DELETE</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteDeleteAccount(req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (error) {
    if (error) {
      return next(error)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}
```

</p>
</details>

<details><summary>/api/user/token - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKey(req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}
```

</p>
</details>

<details><summary>/api/user/token - POST</summary>
<p>





#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postKey(req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}
```

</p>
</details>

<details><summary>/api/user/token/reset - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKeyReset(req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (error) {
    debug('start getKeyReset')
    if (error) return res.status(500).send(error)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}
```

</p>
</details>

<details><summary>/api/seo/* - GET</summary>
<p>



#### Params 
* 0 - **Required** 





#### Code

```javascript
function (req, res) {
    seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
      res.send(seoSettings)
    })
  }
```

</p>
</details>

<details><summary>/:url(api|images|scripts|styles|components|uploads|modules)/* - GET</summary>
<p>



#### Params 
* url - **Required** 
* 0 - **Required** 





#### Code

```javascript
function (req, res) {
    res.status(400).send({
      error: 'nothing found at ' + req.path
    })
  }
```

</p>
</details>

<details><summary>/* - GET</summary>
<p>



#### Params 
* 0 - **Required** 





#### Code

```javascript
function (req, res, next) {
    seo(self, req, function (seoSettings) {
      ejs.renderFile(path.join(__dirname, './layout/index.html'), {
        html: seoSettings,
        googleAnalytics: self.settings.googleAnalytics,
        name: self.settings.app.name,
        assets: self.app.locals.frontendFilesFinal,
        environment: self.environment,
        user: req.user ? req.user : {}
      }, {
        cache: true
      }, function (error, str) {
        if (error) next(error)
        res.send(str)
      })
    })
  }
```

</p>
</details>


## Tasks <a name="Tasks"></a>
### Errors

#### Where do we catch our errors ?

1. Run.js - uncaughtException

``` javascript
process.on('uncaughtException', function (logErr) {
   error.log(err,function(logErr){
      // We will tell the process to quick because its not recommend to continue on
      // we recommend pm2 or something that will restart your processes automatically
      process.exit(1)
   })
})
```

2. Run.js - unhandledRejection

``` javascript
// We do not quit on a unhandled reject because this is only going to work in later versions of node
// and we defer to how you uses promises to handle your errors here but we will still log them for you
process.on('unhandledRejection', function (reason) {
  debug('System Error unhandledRejection:' + reason)
  console.error('[UNHANDLED REJECTION]')
  console.error(error.log(reason))
})
```

3. server/error.js:middleware - express errors

This is not says if express breaks it more of it a error happens on expresses watch then it will defer to this function.

``` javascript
self.app.use(function (err, req, res, next) {
    // 1st pull out all relevant information out of err
    // 2nd check against any common validations with mongoose
    // 3rd start construction all information we can compile for you
    // 4th check if the status code is 500 and over then we log the error with our system
    // 5th check for production mode and if so then do not send back stack/text information
    // 6th send the info we can back to the sure
})
```

#### How do we log our errors

`error.log()`

#### server.error.js:log - system error log

We log every issue for you now in the database under the `error` collection. In doing that we wanted to give admins a place to view there data instead of just in a log(we still log out the error too). check out the [Dashboard](http://localhost:3000/admin?view=errors). We know that some errors will repeat so we check for the same message seeing as that is our main indicator of what happened. If we find the same one again we will update the count and add a timestamp to the history. With this in place you will now have the ability to add back in the logic we have commented out to allowing you to email yourself when you think its worth knowing about with your own rules on the data. Check it out and let us know your thoughts.
### Testing

#### NPM Test / Everything

```bash
# Make sure you haves a selenium sever on 
# https://www.npmjs.com/package/selenium-standalone
npm test
```

#### Nightwatch / E2E

``` bash
npm install -g nightwatch
nightwatch
# or
npm run e2e
```

#### Karma / Frontend

``` bash
npm install -g karma
karma start tests/unit/karma.test.js
# or
npm run karma
```

#### Mocha & Chai / Backend

``` bash
npm install -g mocha
mocha tests/unit/mocha.test.js
# or
npm run mocha
```

#### Standard / JS Style

``` bash
npm install -g standard
standard
# or
npm run standard
```

#### Need help installing?

Easiest way to start testing your whole system 

``` bash
npm run cli
# select - Install Selenium Server
# once installed - Start Selenium Server
npm test
```

Note you must have mongodb running and if you dont then 
``` bash
npm run cli
# the select - Install MongoDB
# in a new window or tab select - Start Mongod
```
### Scripts

Generate-ssl-certs.sh

How to generate your own certs for https.

``` bash
# used to generate your ssl certs - really good for testing ssl out
bash ./scripts/generate-ssl-certs.sh
# used to install mongodb into the project to help those out who dont know mongodb
bash ./scripts/mongodb-install.sh
# used to switch node versions easily with nvm
bash ./scripts/nodejs-change-version.sh
# used to install nodejs with nvm
bash ./scripts/nodejs-install.sh
# used to set proxies need to run our stack if your behind a firewall that needs a proxy
bash ./scripts/set-proxies.sh
# used to start of mongod regardless where it is install - as long as it is in the path
bash ./scripts/start-mongod.sh
# used to delete all proxy configs
bash ./scripts/unset-proxies.sh
# used to help users stack up todate on verisons of the mean stack by helping them merge
node ./scripts/update-meanstackjs.js
# used to install the tools
node ./scripts/postinstall.js
```

### Command Line Interface (CLI)


```bash
npm run cli
```
Options
```
    new inquirer.Separator('Module Creation:'),
    'Create Schema',
    'Create A File or Files',
    'Create Frontend Module',
    'Create Backend Module',
    'Create Frontend & Backend Module',
    new inquirer.Separator('Module Deletion:'),
    'Remove Module',
    new inquirer.Separator('System Tasks:'),
    'Start Mongod',
    'Start Selenium Server',
    'Install SSL Certs',
    'Install Tools Dependencies',
    'Install Bower Dependencies',
    'Install MongoDB',
    'Install NodeJS',
    'Install Selenuim Server',
    'Lint Code',
    'Lint & Fix Code',
    'Mean Stack JS Install Dependencies',
    'Mean Stack JS Post Install',
    'Seed Database',
    'Linux Processes',
    'Linux Kill Processes',
    'Set Proxies',
    'Delete Proxies',
    new inquirer.Separator('User Management:'),
    'Change Password',
    'Change User Roles',
    'View User',
    'Exit'
```

[![meanstackjs CLI](http://meanstackjs.com/images/CLI.png)](http://meanstackjs.com/)


### Tools

#### [Livereload](https://www.npmjs.com/package/livereload)

#### [Mongo Express](https://www.npmjs.com/package/mongo-express)

#### Agenda

Agenda is a light-weight job scheduling library for Node.js.

![Auto-refresh list of jobs](https://github.com/greenpioneersolutions/meanstackjs/blob/master/client/images/agenda.png)

#### Swagger 

Swagger UI is a dependency-free collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API

![Auto-refresh list of jobs](https://github.com/greenpioneersolutions/meanstackjs/blob/master/client/images/swagger.png)

#### Plato

JavaScript source code visualization, static analysis, and complexity tool

![Auto-refresh list of jobs](https://github.com/greenpioneersolutions/meanstackjs/blob/master/client/images/plato.png)
## Information <a name="Information"></a>
 ### Versions 
  #### Dependencies
``` js 
 {
  "angular": "1.6.9",
  "angular-animate": "1.6.9",
  "angular-aria": "^1.6.9",
  "angular-cookies": "1.6.9",
  "angular-jwt": "0.1.9",
  "angular-material": "1.1.7",
  "angular-messages": "^1.6.9",
  "angular-mocks": "1.6.9",
  "angular-moment": "1.2.0",
  "angular-resource": "1.6.9",
  "angular-sanitize": "1.6.9",
  "angular-ui-bootstrap": "2.5.6",
  "angular-ui-router": "0.4.3",
  "auto-parse": "^1.3.0",
  "babel-core": "^6.7.6",
  "babel-plugin-transform-class-properties": "^6.6.0",
  "babel-preset-es2015": "^6.6.0",
  "bcrypt-nodejs": "^0.0.3",
  "body-parser": "^1.14.1",
  "bootstrap-sass": "3.3.7",
  "buildreq": "^2.1.1",
  "chalksay": "^1.1.0",
  "compression": "^1.6.0",
  "connect-mongo": "^2.0.0",
  "cookie-parser": "^1.4.0",
  "cors": "^2.7.1",
  "cross-env": "^5.1.3",
  "debug": "^3.1.0",
  "dotenv": "^5.0.1",
  "ejs": "^2.5.5",
  "express": "^4.14.1",
  "express-content-length-validator": "^1.0.0",
  "express-enforces-ssl": "^1.1.0",
  "express-flash": "^0.0.2",
  "express-force-ssl": "^0.3.2",
  "express-query-parameters": "^1.0.1",
  "express-session": "^1.12.1",
  "express-sitemap": "^1.6.3",
  "express-status-monitor": "^1.0.1",
  "express-validator": "^5.0.3",
  "font-awesome": "4.7.0",
  "foundation-sites": "^6.4.3",
  "fs-extra": "^5.0.0",
  "glob": "^7.1.1",
  "helmet": "^3.1.0",
  "hpp": "^0.2.1",
  "http-status-codes": "^1.0.6",
  "is-there": "^4.3.3",
  "isbot": "^2.0.1",
  "jquery": "3.3.1",
  "jsonwebtoken": "^8.1.0",
  "less": "^3.0.1",
  "lodash": "^4.17.5",
  "materialize-css": "^1.0.0-alpha.4",
  "maxcdn": "^0.2.0",
  "method-override": "^2.3.10",
  "moment": "2.21.0",
  "mongo-throttle": "^1.2.0",
  "mongoose": "^5.0.9",
  "mongoose-timestamp": "^0.6.0",
  "mongoose-validator": "^2.0.2",
  "morgan": "^1.6.1",
  "multer": "^1.3.0",
  "ng-file-upload": "12.2.13",
  "node-horseman": "^3.2.0",
  "node-outlook": "^1.1.6",
  "node-sass": "^4.8.1",
  "node-uuid": "^1.4.8",
  "node-xlsx": "^0.12.0",
  "nodemailer": "^4.6.2",
  "passport": "0.4.0",
  "passport-azure-ad": "^3.0.4",
  "passport-facebook": "^2.1.1",
  "passport-github": "^1.1.0",
  "passport-google-oauth": "^1.0.0",
  "passport-instagram": "^1.0.0",
  "passport-local": "^1.0.0",
  "passport-oauth": "^1.0.0",
  "passport-openid": "^0.4.0",
  "passport-twitter": "^1.0.4",
  "path-to-regexp": "^2.2.0",
  "pug": "^2.0.1",
  "q": "^1.4.1",
  "redis": "^2.8.0",
  "request": "^2.85.0",
  "run-auto": "^2.0.0",
  "semver": "^5.5.0",
  "serial-concat-files": "^2.0.0",
  "snyk": "^1.70.0",
  "socket.io": "^2.0.2",
  "socket.io-client": "2.0.4",
  "toastr": "^2.1.4",
  "uglify-js": "^3.3.14",
  "uglifycss": "^0.0.28",
  "validator": "^9.4.1",
  "winston": "^2.4.1",
  "winston-daily-rotate-file": "^1.7.2",
  "winston-mongodb": "^3.0.2"
}```
#### Dev Dependencies
``` js 
 {
  "a11y": "^0.5.0",
  "blessed": "^0.1.81",
  "chai": "^4.1.2",
  "documentation": "^6.1.0",
  "inquirer": "^5.1.0",
  "jasmine-core": "^3.1.0",
  "karma": "^2.0.0",
  "karma-chai": "^0.1.0",
  "karma-chrome-launcher": "^2.0.0",
  "karma-jasmine": "^1.0.2",
  "karma-mocha": "^1.0.1",
  "mocha": "^5.0.2",
  "multiline": "^1.0.2",
  "nightwatch": "^0.9.20",
  "nightwatch-html-reporter": "^2.0.5",
  "nodemon": "^1.8.1",
  "phantomjs-prebuilt": "^2.1.7",
  "selenium-standalone": "^6.12.0",
  "shelljs": "^0.8.1",
  "standard": "8.6.0",
  "supertest": "^3.0.0"
}```
### Frequently Asked Questions (FAQ)

#### 1. Error: listen EACCES 0.0.0.0

Try Running in Sudo or Admin access
sudo node index.js

``` bash
[UNCAUGHT EXCEPTION]
Error: listen EACCES 0.0.0.0:843
    at Object.exports._errnoException (util.js:856:11)
    at exports._exceptionWithHostPort (util.js:879:20)
    at Server._listen2 (net.js:1218:19)
    at listen (net.js:1267:10)
    at Server.listen (net.js:1363:5)
    at Mean.async.parallel.server (/Users/humphrey/Documents/repos/meanstackjs/server.mean.js:77:22)
``` 

#### 2. Error: connect ECONNREFUSED 127.0.0.1:27017

MongoDB is not running or your uri is not pointing to the correct place

``` bash
[UNCAUGHT EXCEPTION]
Error: connect ECONNREFUSED 127.0.0.1:27017
    at Object.exports._errnoException (util.js:856:11)
    at exports._exceptionWithHostPort (util.js:879:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1057:14)
```


#### 3. xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun

Have you sud­denly started get­ting the fol­low­ing error in your project?

``` bash
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
````
Solution

``` bash
xcode-select --install
```
[Credit](http://tips.tutorialhorizon.com/2015/10/01/xcrun-error-invalid-active-developer-path-library-developer-commandline-tools-missing-xcrun/)

#### 4. Angularjs: Error: [ng:areq] Argument 'HomeController' is not a function, got undefined

This creates a new module/app:

`var myApp = angular.module('myApp',[]);`

While this accesses an already created module (notice the omission of the second argument):

`var myApp = angular.module('myApp');`

Since you use the first approach on both scripts you are basically overriding the module you previously created.

On the second script being loaded, use `var myApp = angular.module('myApp');`

[Credit](http://stackoverflow.com/a/25895387)
Welcome to those of you here reading the roadmap. we are very open to feedback and to debate what would be a great fit in the stack. With that being said lets start the conversation right here and get it planned into the start. Please feel free to create a issue/feature request.

There will be more info to come later in the roadmap.

Meanstackjs 1.x - Goal is to support Enterprises
----------------

We will default to what supports most of versions of node, browsers & users. 1.x will try to keep production ready at all time with the most stable code base.

* ES5
* [Expressjs 4](http://expressjs.com/en/4x/api.html)
* [Boostrap 3](https://getbootstrap.com/docs/3.3/)
* [Angular](https://angularjs.org/) 1.x
* [MongoDB](https://www.mongodb.com/download-center#community) 3.x
* [Nodejs](https://github.com/nodejs/LTS#lts_schedule) 6.x - 9.x
* [John Papa Angular Style](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
* [NightwatchJS](http://nightwatchjs.org/) 0.x - 1.x

Meanstackjs 2.x - Goal is to support Open Source Comp
----------------

We plan to really use forward thinking technologies with the all the newest stuff.

* ES6
* [Expressjs 5](http://expressjs.com/en/guide/migrating-5.html)
* [Boostrap 4](https://getbootstrap.com/)
* [Angular](https://angular.io/) 5.x > 
* [MongoDB](https://www.mongodb.com/download-center#community) 3.x - 4.x
* [Nodejs](https://github.com/nodejs/LTS#lts_schedule) 10.x - 14.x
* [John Papa Angular 2 Style ](https://github.com/johnpapa/angular-styleguide/tree/master/a2)
* [NightwatchJS](http://nightwatchjs.org/) 1.x - 2.x


Meanstack will try to support regardless the version
---------------
* CSS, SCSS & LESS (support Materialize & Foundation)
* [Standard JS](http://standardjs.com/) 
* [Docker](https://www.docker.com/)
* [Swagger Api](http://swagger.io/)

Potential Mern Stack Js on the rise in the future.


### Changelog

#### Mar 12th 18 - v1.9.1
#296 Address potential security vulnerability

#### Mar 12th 18 - v1.9.0
#294 - Creating Scripts To Automate Documentation
#293 - File to import not found or unreadable: bootstrap
#292 - Update Dev Dependencies
#285 - Livereload Support HTTPS
#284 - Socket Support HTTP & HTTPS
#126 - Move Frontend Dep to NPM

#### Mar 6th 18 - v1.8.2
#291 Update Dependencies 

#### Feb 18th 18 - v1.8.1
#289 Fix meanstackjs loading problem due to too old node-sass package @hillkim7 
#288 Enhance configurable environment variables @shawncampbell 

#### Aug 1st 17 - v1.8.0
#280 Add settings for cache & security
#278 For validation errors after password reset
#277 Expose Socket.io to every Module enhancement
#276 Turn Http & Https on at same time enhancement
#275 Close mongoose connections on shutdown enhancement
#274 Update the proxy enhancement
#259 Add Local Storage Factory enhancement
#258 Support Yarn enhancement
#245 Update Logout

#### Feb 19th 17 - v1.7.0
#220 Add other Auths enhancement
#219 Update to GPS style enhancement
#218 abstract out routes & tools
#217 Add Better Logging enhancement
#211 Load Mongoose Models Sooner enhancement Ideas Investigate
#207 Replace Names bug
#198 Config Error Logger enhancement


#### Feb 6th 17 - v1.6.0
#210 Update users urls
#209 Add API Key Support enhancement
#208 can't handle production external URLs bug Submitted by @oshirodk
#206 Set all Deps to set versions bug
#204 Update Error Logger enhancement
#200 Add system status api enhancement
#199  Debug Front Info Page enhancement
#192 Link Account enhancement
#190 Add Debug Page


#### Jan 2nd 17 - v1.5.0
# Release 1.5.0

[b8243d3125072726b184e96cd2d01e0088466d8f](https://github.com/greenpioneersolutions/meanstackjs/commit/b8243d3125072726b184e96cd2d01e0088466d8f)
- Error Handling
- CLI upgrade
- New Scripts
- Error Dashboard
- Dotenv Integrated
- Custom Environments
- Minify Config

#181 
#179
#178
#177
#175
#174
#173 
#172
#171
#170
#169
#167
#165
#164
#161
#159 
#158
#157
#156 
#153


#### Dec 23rd 16 - v1.4.1
#161 


#### Dec 23rd 16 - v1.4.0
#148
#147
#146
#144
#143
#123


#### Nov 20th 16 - v1.3.0
#142
#141
#140 
#139 
#131 


#### Nov 5th 16 - v1.2.0
#127
#128
#129
#130
#132
#133
#134
#135
#136
#137


#### Oct 17th 16 - v1.1.0
#105
#108 
#109
#112 
#114
#115
#116
#117
#118
#119
#120
#121
#122
#123
#124
#125


#### Oct 17th 16 - v1.0.1
#113 Pushed the patch for bower resolution


#### Sep 12th 16 - v1.0.0
It is now officially ready for use 1.0.0 !!!!

More Documentation to come here later


#### Sep 6th 16 - v0.5.0
#96 Updated Stack , Testing , Cli & Comments
#95 Switched from Swig to EJS
#94 Resolve to $state.go 
#93 IsAuthorized Middleware
#92 Remove routing Buildreq

NOTE- VERSION 1.0 will be published within the week


#### Aug 17th 16 - v0.4.3
#90 Add MaxCDN enhancement
#88 Fix Iphone Error bug
#87 Scss Support ENV enhancement
#86 Add The Ability to Config Domain Change enhancement
#85 Fix: Redirect on Errors bug
#84 Add: Last Login to User Schema enhancement
#82 Update: the CLI Templates bug
#81 Contrib: Add Timestamp enhancement help wanted
#80 Add Code Wake
#79 Contrib: Add Full Admin Dashboard enhancement help wanted


#### Jul 26th 16 - v0.4.2
#5 Documentation & updates
#77  Add Simple Admin Portal & tests
#76 Fix mongoose connect error
#78 Fix all exports /modules
#75 style update


#### Jul 26th 16 - V0.4.1
#72 Add Https
#74 Add Mean Seo
#7 Add Security


#### Jul 26th 16 - v0.4.0
#66 Fix Agenda
#67 update seo user & system
#68 Add custom express validators
#69 Add Error Handler
#70 Add Backup & Restore job for mongo
#71 Add Site map
#44 Update bower


#### May 5th 16 - v0.3.3
#63 Update license
#64 Update Contributing
#59 Update the commands cli
#58 move the user factory
#57 update  frontend test cases
#56 add agenda 
#54 Fixed the models
#51 add more e2e testing
#48 Update npm packages
#43 Fixed cli


#### Apr 27th 16 - v0.3.2
#53 & #38  update index page
#54  fix the models , now it allows us to have multiple models
#48 update the npm list 
#51  add a login tests & general test
#41 add simple ng-enter directive
#52 add gitter badge
#49  & #36 update user module


#### Apr 20th 16 - v0.3.1
#35 added frontend test cases
#43 fixed cli error
#32 added travis.ci


#### Apr 19th 16 - v0.3.0
#1 added nightwatch.js e2e
#24 added mongo express server to give you admin db view in dev mode
#26 create and update the environment & settings js
#27 added plato to analyze code at localhost:3000/plato
#28  can check the reporter of night watch at localhost:3000/e2e
#30 Updated & Reorder the server and client side code


#### Apr 15th 16 - v0.2.1
#20 Added Babel for es6 support on the server side
#22 Added swagger at localhost:3000/api/
#23 Added Dockerfile


#### Apr 12th 16 - v0.2.0
## #19 did a major Refactor

Created Run Module - to run all type of servers ( socketio , mean  , livereload ..etc)
Refactor Register.js 
Refactor Mean.Sever.js 

Updated Commands
Updated Models
Updated Routes
Updated Controllers


#### Mar 28th 16 - v0.1.4
#18 added JWT - https://github.com/auth0/node-jsonwebtoken
Updated Settings , frontend , backend... basically everything


#### Feb 22nd 16 - v0.1.3
#16 Update the aggregation to not mangle the js & to update the variables to handle the fonts paths
#15 Added the a basic socket.io server with angular factory


#### Jan 25th 16 - v0.1.2
#14 Updated the buildreq with its middleware


#### Jan 23rd 16 - v0.1.1
- #11 - inject mongoose so that the query builder 
- #12 - cut of the redundant question of do you want a custome schema
- #13 - fix the small reference issue to get the blog populating again


#### Jan 11th 16 - v0.1.0
## Features
- Customizable CLI for scaffolding of modules
- Can Build Dynamic Api's based off Schema
- Can Open Dynamic Query with routes
- LiveReload & Recompile in Development Env
- Not Dependent on Grunt or Gulp 
- No Magic Wand
- Uses JS Standard & John Papa Angular Style
- UI framework agnostic - Use Boostrap , Materialize or Foundation
- Supports CSS, SCSS & LESS
- Simple Project Structure
- Supports Clustering
- Supports Environments: Development, Test & Production

## Note

This is our first minor release and it it not meant for production currently. 


