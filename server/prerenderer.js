module.exports = prerenderer

var Horseman = require('node-horseman')
var isBot = require('isbot')
var MEAN_STACK_UA = 'Mean Stack Prerenderer'

function shouldRenderFromPhantom (req) {
  var userAgent = req.headers['user-agent']
  var bufferAgent = req.headers['x-bufferbot']
  var prerenderedPage = false

  if (!userAgent || userAgent === MEAN_STACK_UA) return false
  if (req.method !== 'GET' && req.method !== 'HEAD') return false

// does it contain _escaped_fragment_, show prerendered page
  var parsedQuery = req.query
  if (parsedQuery._escaped_fragment_ !== undefined) prerenderedPage = true

// is it a bot then show prerendered page
  if (isBot(userAgent)) prerenderedPage = true

// is it a bufferbot then show prerendered page
  if (bufferAgent) prerenderedPage = true

  return prerenderedPage
}

function prerenderer (req, res, next) {
  if (shouldRenderFromPhantom(req)) {
    var escapedFragment = req.query._escaped_fragment_
    var fullHref = req.protocol + '://' + req.headers.host + (escapedFragment ? req.path + '#!/' + escapedFragment : req.originalUrl)

    new Horseman()
.userAgent(MEAN_STACK_UA)
.open(fullHref)
.html().then(function (html) {
  res.send(html)
}).catch(function (error) {
  next(error)
}).close()

    return
  }
  next()
}
