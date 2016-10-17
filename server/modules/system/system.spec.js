var assert = require('chai').assert
var request = require('supertest')

describe('SYSTEM', function () {
  describe('GET /api/testing', function () {
    it('should be returning object', function (done) {
      request('localhost:3000/')
        .get('api/testing')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.isObject(res.body.query)
          done()
        })
    })
  })
})
