exports.load = function (swagger, parms) {
  var searchParms = parms.searchableOptions
  var Bloglist = {
    'spec': {
      description: 'Blog operations',
      path: '/blog',
      method: 'GET',
      summary: 'Get Blog',
      notes: '',
      type: 'Blog',
      nickname: 'getBlog',
      produces: ['application/json'],
      parameters: searchParms
    }
  }

  swagger.addGet(Bloglist)
}
