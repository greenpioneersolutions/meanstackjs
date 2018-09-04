const path = require('path')
const shell = require('shelljs')
const glob = require('glob')
const serverPackageJsonFiles = glob.sync('./server/tools/*/package.json')

for (let index = 0; index < serverPackageJsonFiles.length; index++) {
  let fileLocation = path.resolve(serverPackageJsonFiles[index])
  let filePath = path.parse(fileLocation)
  shell.cd(`${filePath.dir}`)
  shell.exec('npm install', { silent: false }, function () {
    console.log(`Finished Installing ${serverPackageJsonFiles[index]}`)
  })
}
