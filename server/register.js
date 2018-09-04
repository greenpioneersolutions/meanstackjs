module.exports = { register }

const glob = require('glob')
const path = require('path')

function register (self) {
  self.register = 'register ME'
  self.files = {
    routes: glob.sync(path.join(__dirname, '/modules/**/*.routes.js')),
    models: glob.sync(path.join(__dirname, '/modules/**/*.model.js')),
    controller: glob.sync(path.join(__dirname, '/modules/**/*.controller.js')),
    spec: glob.sync(path.join(__dirname, '/modules/**/*.spec.js')),
    socket: glob.sync(path.join(__dirname, '/modules/**/*.socket.js'))
  }
}
