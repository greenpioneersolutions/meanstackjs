var <%= name %> = require('./<%= name %>.controller.js')

module.exports = function (io, socket) {
  socket.on('<%= name %>', <%= name %>.on<%= Name %>(io, socket))
}