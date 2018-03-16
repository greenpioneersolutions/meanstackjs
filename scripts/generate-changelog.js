var fs = require('fs')
var request = require('request')
var moment = require('moment')
request.get({
  url: 'https://api.github.com/repos/greenpioneersolutions/meanstackjs/releases?per_page=150',
  headers: {
    'Content-Type': 'application/json',
    'user-agent': 'changelog'
  }
}, function (error, response, body) {
  if (error) throw new Error(error)
  var data = JSON.parse(body)
  var changelog = '### Changelog\n'

  for (var i = 0; i < data.length; i++) {
    changelog += '\n'
    changelog += '#### '
    changelog += moment(data[i].published_at).format('MMM Do YY')
    changelog += ' - '
    changelog += data[i].name
    changelog += '\n'
    changelog += data[i].body
    changelog += '\n'
  }
  fs.writeFileSync('./documentation/changelog.md', changelog)
})
