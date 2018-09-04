const {assert}= require('chai')
const request= require('supertest')

describe('USERS', () => {
  describe('GET /api/user', () => {
    it('should be returning unauthenticated', done => {
      request('localhost:3000/')
        .get('api/user/authenticate')
        .expect(200, (error, res) => {
          if (error) return done(error)
          assert.equal(res.body.success, false)
          assert.equal(res.body.authenticated, false)
          assert.equal(res.body.redirect, false)
          done()
        })
    })
    it('should be returning token', done => {
      request('localhost:3000/')
        .get('api/user/token')
        .expect(401, (error, res) => {
          if (error) return done(error)
          assert.equal(res.body.success, false)
          done()
        })
    })
  })
})
