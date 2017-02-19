module.exports = setupToolSwagger

var express = require('express')
var debug = require('debug')('meanstackjs:tools')
var path = require('path')
var _ = require('lodash')
var fs = require('fs')

function setupToolSwagger (self) {
  debug('started setupToolSwagger')

  function handleIndex (req, res, next) {
    if (req.url !== '/' && req.url !== '/index.html') {
      return next()
    }

    if (req.originalUrl === '/api') {
      return res.redirect(301, '/api' + '/')
    }

    if (html) {
      return res.send(html)
    }

    fs.readFile(swaggerUI.dist + '/index.html', {
      encoding: 'utf8'
    }, function (err, data) {
      if (err) {
        console.error(err)
        return res.send(500)
      }

      html = data.replace('http://petstore.swagger.io/v2/swagger.json', '/api-docs')
      res.send(html)
    })
  }

  if (self.settings.swagger) {
    var Swagger = require('swagger-node-express')
    var swaggerUI = require('swagger-ui')
    self.app.use('/api/index.html', handleIndex)
    self.app.use('/api/', handleIndex)
    self.app.use('/api', express.static(swaggerUI.dist))
    var html

    var swagger = Swagger.createNew(self.app)

    var paramTypes = swagger.paramTypes
    var sortParm = paramTypes.query('sort', 'Comma seperated list of params to sort by.  (e.g "-created,name") ', 'string')
    var limitParm = paramTypes.query('limit', 'Number of items to return', 'number')
    var skipParm = paramTypes.query('skip', 'Number of items to skip', 'number')

    var defaultGetParams = [
      sortParm,
      limitParm,
      skipParm
    ]

    var swaggerPath = path.resolve(self.dir, './tools/swagger/modules')
    if (!fs.existsSync(swaggerPath)) {
      throw new Error('Critical Folder Missing:')
    }

    var swaggerDir = _.filter(fs.readdirSync(swaggerPath), function (n) {
      return !_.startsWith(n, '.')
    })

    _.forEach(swaggerDir, function (n) {
      var model = require(path.join(self.dir, '/tools/swagger/modules/', n, '/models'))
      swagger.addModels(model)
      require(path.join(self.dir, '/tools/swagger/modules/', n, '/services'))
        .load(swagger, {
          searchableOptions: defaultGetParams
        })
    })

    swagger.configureSwaggerPaths('', '/api-docs', '')
    swagger.configureDeclaration('Meanstackjs', {
      description: 'Meanstackjs API',
      authorizations: [''],
      produces: ['application/json']
    })
    swagger.setApiInfo({
      title: 'Meanstackjs',
      description: 'Meanstackjs API',
      termsOfServiceUrl: 'http://meanstackjs.com',
      contact: 'info@meanstackjs.com',
      licenseUrl: 'http://en.wikipedia.org/wiki/MIT_License'
    })
    swagger.setAuthorizations({
      apiKey: {
        type: 'apiKey',
        passAs: 'header'
      }
    })
    swagger.configure('/api', '1.0')
  }
  debug('end setupToolSwagger')
}
