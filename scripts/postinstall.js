var fs = require('fs')
var path = require('path')
var shell = require('shelljs')
var toolsDir = path.join(process.cwd(), 'tools')
fs.readdir(toolsDir, function (err, files) {
  console.log('Start Tools Install')
  if (err && err.code !== 'ENOENT') throw Error(err)
  if (!files || !files.length) return
  files.forEach(function (file, key) {
    if (file === '.DS_Store') return
    shell.cd(toolsDir + '/' + file)
    shell.exec('npm install', {silent: false}, function () {
      console.log('Finished Installing ' + file)
    })
  })
})
