var chat = require('./chat.controller.js')

module.exports = function (io, socket) {
  socket.on('message', chat.onMessage(io, socket))
}
