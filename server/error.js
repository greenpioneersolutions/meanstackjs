module.exports = { middleware, log }

const { logger } = require('./logger.js')

function log (error, cb) {
  if (typeof cb !== 'function') {
    cb = () => {}
  }
  if (!(error instanceof Error)) {
    error = new Error(error)
  }
  logger.error(error.message, error)
  console.error(error.message, error)
}

function jsonStringify (obj) {
  return JSON.stringify(obj, null, 2)
}

function middleware (self) {
  self.app.use((error, req, res, next) => {
    let code = typeof error.status === 'number' ? error.status : 500
    let message = error.message || error.msg
    let type = 'express'
    const ip = req.ip || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (error.name === 'ValidationError') {
      code = 400
      message = 'Validation Error'
      type = 'mongo'
    }
    if (error.name === 'CastError') {
      code = 400
      message = 'Invalid Cast'
      type = 'mongo'
    }
    if (error.message === 'MongoError') {
      code = 400
      if (error.code === 11000) message = 'Duplicate key error '
      else message = 'Database Error'
      type = 'mongo'
    }

    const text = `\n=== EXCEPTION ===\n  \nMessage:\n${message}\n\nCode:\n${code}\n \nUser:\n${req.user ? req.user.email : 'no user info'}\n \nIP Address:\n${ip || 'no IP'}\n \nUser-Agent:\n${jsonStringify(req.headers['user-agent'])}\n \nRoute:\n${req.method}-${req.url}\n \nHeaders:\n\n${jsonStringify(req.headers)}\n \nParams:\n\n${jsonStringify(req.params)}\n \nBody:\n\n${jsonStringify(req.body)}\n \nSession:\n\n${jsonStringify(req.session)}\n \nStack:\n${error.stack}\n`

    res.status(code)

    if (code >= 500) {
      error.type = type
      error.stack = text
      log(error)
    }

    const renderData = {
      text: '',
      message,
      code,
      title: `${code}`
    }
    if (self.settings.environment !== 'production') {
      renderData.text = text
    }
    return res.send(renderData)
  })
}
