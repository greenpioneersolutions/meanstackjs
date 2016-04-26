var assert = require('chai').assert
var request = require('supertest')
var blogid = ''
describe('BLOG', function () {
  describe('GET /api/v1/Blog', function () {
    it('should be returning array', function (done) {
      request('localhost:3002/')
        .get('api/v1/Blog')
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.isArray(res.body.data)
          blogid = res.body.data[0]._id
          done()
        })
    })
    it('should be returning object', function (done) {
      request('localhost:3002/')
        .get('api/v1/Blog/' + blogid)
        .expect(200, function (err, res) {
          if (err) return done(err)
          assert.isObject(res.body.data)
          assert.equal(res.body.data.title, 'Mean')
          assert.equal(res.body.data.content, 'Mongo Express Angular Node')
          done()
        })
    })
  })
})
