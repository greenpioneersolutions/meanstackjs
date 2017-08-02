exports.onMessage = onMessage

function onMessage (io, socket) {
  return function (msg) {
    io.emit('message', msg)
  }
}
