module.exports = Livereload

var path = require('path')
var livereload = require('livereload')
var debug = require('debug')('meanstackjs:livereload')
var fs = require('fs')

function Livereload (self, done) {
  if(self.settings.https.active){
    var serverHttps = livereload.createServer({
      https:{
        key: fs.readFileSync(self.settings.https.key),
        cert: fs.readFileSync(self.settings.https.cert)
      },
      port:35730
    })
    serverHttps.watch(path.join(__dirname, '../../client'))
  }
  if(self.settings.http.active){
    var serverHttp = livereload.createServer({
      port:35729
    })
    serverHttp.watch(path.join(__dirname, '../../client'))
  }
  debug('starting Livereload Server')
  done(null)
}
