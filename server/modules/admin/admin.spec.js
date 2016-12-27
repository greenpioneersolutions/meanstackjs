var assert = require('chai').assert
var request = require('supertest')

describe('Admin', function () {
  describe('GET /api/admin', function () {
    it('should be returning admin', function (done) {
      request('localhost:3000/')
        .get('api/admin')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
