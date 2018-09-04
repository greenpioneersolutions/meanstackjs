const glob = require('glob')
const path = require('path')
const shelljs = require('shelljs')
const files = glob.sync('./server/**/tests/*.js')
var args = process.argv.slice(2)
for (let index = 0; index < files.length; index++) {
  let testPath = path.parse(files[index])
  if (args.indexOf(testPath.name) !== -1) {
    runTest(testPath.name, files[index])
  }
}

function runTest (name, location) {
  if (name === 'mocha') {
    shelljs.exec(`node_modules/.bin/mocha ${path.resolve(location)} --exit`)
  }
}
