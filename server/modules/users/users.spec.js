var assert = require('chai').assert
var request = require('supertest')

describe('USERS', function () {
  describe('GET /api/authenticate', function () {
    it('should be returning unauthenticated', function (done) {
      request('localhost:3002/')
        .get('api/authenticate')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.equal(res.body.success, false)
          assert.equal(res.body.authenticated, false)
          assert.equal(res.body.redirect, false)
          done()
        })
    })
  })
})
