var assert = require('chai').assert
var request = require('supertest')

describe('Admin', function () {
  describe('GET /api/admin/users', function () {
    it('should be returning no users - unauthorized', function (done) {
      request('localhost:3000/')
        .get('api/admin/users')
        .expect(401, function (err, res) {
          if (err) return done(err)
          assert.equal(res.body.success, false)
          done()
        })
    })
  })
  describe('GET /api/admin/users', function () {
    it('should be returning no errors - unauthorized', function (done) {
      request('localhost:3000/')
        .get('api/admin/errors')
        .expect(401, function (err, res) {
          if (err) return done(err)
          assert.equal(res.body.success, false)
          done()
        })
    })
  })
})
