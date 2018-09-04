module.exports = run

require('./util.js')

if (!module.parent) {
  run(require('./server/server.js'))
  run(require('./socket/server.js'))
}
function run (ServerConstructor, opts, cb) {
  if (!opts) opts = {}
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  return new ServerConstructor(opts, (err, data) => {
    if (err) {
      console.error(`Error during startup. Abort.`)
      console.error(err.stack)
      process.exit(1)
    }
    typeof cb === 'function' && cb()
  })
}
