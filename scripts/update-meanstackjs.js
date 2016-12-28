var request = require('request')
var semver = require('semver')
var spawn = require('child_process').spawn
request({
  json: true,
  url: 'https://raw.githubusercontent.com/greenpioneersolutions/meanstackjs/master/package.json'
}, function (err, res, body) {
  if (err) return console.log('Error:', err)
  var current = require('../package.json').version
  var next = body.version
  if (next === current) {
    console.log('You are up-to-date.')
    return
  }
  if (semver.major(next) > semver.major(current)) {
    console.log('You are going to update to a major release which may contain breaking changes.')
    console.log('Please run `git merge --abort` if you want to cancel the process.')
  }
  console.log('This will update from GitHub the latest changes. Conflicts may appear.')
  spawn('git', ['pull', 'https://github.com/greenpioneersolutions/meanstackjs', 'master'], {
    stdio: 'inherit'
  })
})
