var fs = require('fs')
var path = require('path')
var glob = require('glob')
var express = require('express')
var routes = glob.sync('./server/**/*.routes.js')
var _ = require('lodash')
var mongoose = require('mongoose')
var self = {
  models: {}
}
var files = glob.sync('server/modules/**/*.model.js')
files.forEach(function (model, key) {
  var name = _.words(path.basename(model), /[^. ]+/g)[0]
  self.models[name] = mongoose.model(name, require('../' + model))
  self.models[name].on('index', function (error) {
    if (error) throw error
  })
})
self = {
  app: express(),
  middleware: require('../server/middleware.js'),
  mail: require('../server/mail.js'),
  logger: {},
  settings: require('../configs/settings.js').get(),
  environment: 'APIGENERATE',
  dir: __dirname
}
var routeInfo = {
    // Add any custom
  'get': {
    '/api/user/authenticate': {
      description: 'Check Authentication',
      method: 'get'
    },
    '/api/blog/': {
      description: 'Blog operations'
    }
  },

  'post': {
    '/api/user/authenticate': {
      description: 'Authentication route'
    }
  },
  'put': {},
  'delete': {},
  'patch': {}
}
for (let index = 0; index < routes.length; index++) {
  require(path.resolve(routes[index]))(self.app, self.middleware, self.mail, self.settings, self.models, self.logger)
}
require('../server/routes.js').buildRoutes(self)

var apiDoc = '## API \n\n'
for (let index = 0; index < self.app._router.stack.length; index++) {
  if (self.app._router.stack[index].route) {
    var middleware = ''
    for (let route = 0; route < self.app._router.stack[index].route.stack.length; route++) {
      if (self.app._router.stack[index].route.stack.length === (route + 1)) {
        var paramsDoc = '#### Params \n'
        for (let param = 0; param < self.app._router.stack[index].keys.length; param++) {
          paramsDoc += `* ${self.app._router.stack[index].keys[param].name} - **${self.app._router.stack[index].keys[param].optional ? 'Optional' : 'Required'}** \n`
        }
        var routeInfoDoc = ''
        if (routeInfo[self.app._router.stack[index].route.stack[route].method][self.app._router.stack[index].route.path]) {
          for (const key in routeInfo[self.app._router.stack[index].route.stack[route].method][self.app._router.stack[index].route.path]) {
            routeInfoDoc += `#### ${_.capitalize(key)} \n  ${routeInfo[self.app._router.stack[index].route.stack[route].method][self.app._router.stack[index].route.path][key]}\n`
          }
        }
        apiDoc += `
<details><summary>${self.app._router.stack[index].route.path} - ${self.app._router.stack[index].route.stack[route].method.toUpperCase()}</summary>
<p>

${routeInfoDoc}\n
${self.app._router.stack[index].keys.length > 0 ? paramsDoc : ''}\n
${middleware ? '#### Middleware\n' + middleware : ''}\n

#### Code

\`\`\`javascript
${self.app._router.stack[index].route.stack[route].handle}
\`\`\`

</p>
</details>\n`
        middleware = ''
      } else {
        middleware += `
<details><summary>${self.app._router.stack[index].route.stack[route].name}</summary>
<p>

\`\`\`javascript
${self.app._router.stack[index].route.stack[route].handle}
\`\`\`

</p>
</details>\n`
      }
    }
  }
}
module.exports = apiDoc
fs.writeFileSync('./documentation/API.md', apiDoc)
