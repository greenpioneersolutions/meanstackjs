const {assert}= require('chai')
const request= require('supertest')
let blogid = ''

describe('BLOG', () => {
  describe('GET /api/blog', () => {
    it('should be returning array', done => {
      request('localhost:3000/')
        .get('api/blog')
        .expect(200, (error, res) => {
          if (error) return done(error)
          assert.isArray(res.body.blogs)
          blogid = res.body.blogs[0]._id
          done()
        })
    })
    it('should be returning object', done => {
      request('localhost:3000/')
        .get(`api/blog/${blogid}`)
        .expect(200, (error, res) => {
          if (error) return done(error)
          assert.isObject(res.body)
          done()
        })
    })
    it('should be invalid id 400', done => {
      request('localhost:3000/')
        .get(`api/blog/${blogid}1`)
        .expect(400, (error, res) => {
          if (error) return done(error)
          assert.equal(res.body.success, false)
          done()
        })
    })
    it('should be nothing found 200', done => {
      request('localhost:3000/')
        .get(`api/blog/59997ebc4a999b163e999162`)
        .expect(200, (error, res) => {
          if (error) return done(error)
          assert.deepEqual(res.body, {})
          done()
        })
    })
  })
  
})
