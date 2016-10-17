var assert = require('chai').assert
var request = require('supertest')

describe('__Name__', function () {
  describe('GET /api/__name__', function () {
    it('should be returning __name__', function (done) {
      request('localhost:3000/')
        .get('api/__name__')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.deepEqual(res.body, [])
          done()
        })
    })
  })
})
