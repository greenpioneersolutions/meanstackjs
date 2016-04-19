var assert = require('assert')
// var request = require('supertest')
// var Mean = require('../../../mean.server.js')
// var run = require('../../../run.js')
// if (!module.parent) {
//   run(Mean)
// }
describe('USERS TESTING', function () {
  // describe('GET /api/login', function () {
  //   it('should be returning unauthenticated', function (done) {
  //     request('localhost:3000/')
  //       .get('/api/login')
  //       .expect(200, function (err, res) {
  //         if (err) return done(err)
  //         assert.equal(res.body.authenticated, false)
  //         done()
  //       })
  //   })
  // })
  describe('Example Test', function () {
    function add () {
      return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
        return prev + curr
      }, 0)
    }
    var tests = [
      {
        args: [1, 2],
        expected: 3
      },
      {
        args: [1, 2, 3],
        expected: 6
      },
      {
        args: [1, 2, 3, 4],
        expected: 10
      }
    ]

    tests.forEach(function (test) {
      it('correctly USER ' + test.args.length + ' args', function () {
        var res = add.apply(null, test.args)
        assert.equal(res, test.expected)
      })
    })
  })
})
