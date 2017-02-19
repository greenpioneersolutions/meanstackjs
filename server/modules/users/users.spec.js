var assert = require('chai').assert
var request = require('supertest')

describe('USERS', function () {
  describe('GET /api/user', function () {
    it('should be returning unauthenticated', function (done) {
      request('localhost:3000/')
        .get('api/user/authenticate')
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.equal(res.body.success, false)
          assert.equal(res.body.authenticated, false)
          assert.equal(res.body.redirect, false)
          done()
        })
    })
    it('should be returning token', function (done) {
      request('localhost:3000/')
        .get('api/user/token')
        .expect(401, function (error, res) {
          if (error) return done(error)
          assert.equal(res.body.success, false)
          done()
        })
    })
  })
})
