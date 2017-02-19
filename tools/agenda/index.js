module.exports = setupToolAgenda

var debug = require('debug')('meanstackjs:tools')
var path = require('path')
var fs = require('fs')
var Agenda = require('agenda')
var Agendash = require('agendash')
var backup = require('mongodb-backup')
var restore = require('mongodb-restore')

function setupToolAgenda (self) {
  debug('started setupToolAgenda')
  if (self.settings.agendash.active) {
    self.agenda = new Agenda(self.settings.agendash.options)
    if (!fs.existsSync(self.dir + '/backups/')) {
      fs.mkdirSync(self.dir + '/backups/')
    }

    self.agenda.define('backup', function (job, done) {
      var db = {}
      if (!fs.statSync(path.join(self.dir, 'backups/'))) done('No Root Directory ')
      if (job.attrs.data.uri) db.uri = job.attrs.data.uri
      else done('No URI was passed')
      if (job.attrs.data.collections) db.collections = job.attrs.data.collections
      try {
        backup(db)
      } catch (err) {
        done(err)
      }
      done()
    })

    self.agenda.define('restore', function (job, done) {
      var db = {}
      if (!fs.statSync(path.join(self.dir, 'backups/'))) done('No Root Directory ')
      if (job.attrs.data.uri) db.uri = job.attrs.data.uri
      else done('No URI was passed')
      try {
        restore(db)
      } catch (err) {
        done(err)
      }
      done()
    })

    self.agenda.on('ready', function () {
      // //every 3 mins or every minute
      // self.agenda.every('3 minutes', 'restore')
      // self.agenda.every('*/1 * * * *', 'backup')
      self.agenda.start()
    })

    self.app.use('/agenda', /*  require('./server/middleware.js').isAdmin, */ Agendash(self.agenda))
  }
  debug('end setupToolAgenda')
}
