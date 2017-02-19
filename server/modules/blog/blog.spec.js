var assert = require('chai').assert
var request = require('supertest')
var blogid = ''

describe('BLOG', function () {
  describe('GET /api/blog', function () {
    it('should be returning array', function (done) {
      request('localhost:3000/')
        .get('api/blog')
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.isArray(res.body.blogs)
          blogid = res.body.blogs[0]._id
          done()
        })
    })
    it('should be returning object', function (done) {
      request('localhost:3000/')
        .get('api/blog/' + blogid)
        .expect(200, function (error, res) {
          if (error) return done(error)
          assert.isObject(res.body)
          done()
        })
    })
  })
})
