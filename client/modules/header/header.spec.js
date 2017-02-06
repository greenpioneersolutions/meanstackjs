describe('HEADER Testing', function () {
  describe('controller', function () {
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var UserFactory
    var $httpBackend
    var HeaderController

    beforeEach(module('app.header'))
    beforeEach(module('app.index'))
    beforeEach(module('app.user'))
    beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _UserFactory_) {
      UserFactory = _UserFactory_
      $httpBackend = _$httpBackend_
      $httpBackend.whenGET(/\/api\/user\/logout\?noCache=\d+/)
        .respond(200, '')
      $httpBackend.whenGET(/\/api\/user\/authenticate\?noCache=\d+/)
        .respond(200, authResponse)
      $httpBackend.when('GET', /\/api\/seo\/*/)
        .respond(200, {})
      $httpBackend.when('GET', /modules\/core\/[\d\w]+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      $httpBackend.when('GET', /modules\/index\/[\d\w]+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      // Authenticate in UserFactory class constructor
      $httpBackend.flush()
      var $scope = $rootScope.$new()
      HeaderController = $controller('HeaderController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(HeaderController).to.exist
    })

    it('vm.logout() should empty vm user factory', function () {
      // Filled by authentication in beforeEach
      expect(HeaderController.UserFactory).to.not.be.empty
      expect(HeaderController.UserFactory).to.equal(UserFactory)
      HeaderController.logout()
      $httpBackend.flush()
      expect(HeaderController.UserFactory).to.be.empty
    })
  })

  this.timeout(500)

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300)
  })

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 200)
  })
})
