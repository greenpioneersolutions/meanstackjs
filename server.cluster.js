var os = require('os')
var cluster = require('cluster')
var chalk = require('chalk')
var debug = require('debug')('meanstackjs:cluster')

debug('starting up Cluster')
cluster.setupMaster({
  exec: 'index.js'
})

cluster.on('exit', function (worker) {
  console.log(chalk.red('worker ' + worker.id + ' died'))
  cluster.fork()
  console.log(chalk.blue('Forked New Worker'))
})

for (var i = 0; i < os.cpus().length; i++) {
  cluster.fork()
  console.log(chalk.blue('Forked New Worker' + i))
}
