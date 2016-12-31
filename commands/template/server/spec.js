var assert = require('chai').assert
var request = require('supertest')

describe('<%= Name %>', function () {
  describe('GET /api/<%= name %>', function () {
    it('should be returning <%= name %>', function (done) {
      request('localhost:3000/')
        .get('api/<%= name %>')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
