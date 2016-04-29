describe('USER Testing', function () {
  var UserFactory
  var $httpBackend
  var authResponse = {
    user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
  }
  var credentials = {
    loginCred: {
      email: 'test@user.com',
      password: 'testuser11!@'
    }
  }
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))
  beforeEach(inject(function (_$httpBackend_, _UserFactory_) {
    $httpBackend = _$httpBackend_
    $httpBackend.when('GET', /\/api\/authenticate\?noCache=\d+/)
      .respond(200, authResponse)
    $httpBackend.when('GET', /modules\/core\/[\d\w]+\.view\.html\?noCache=\d+/)
      .respond(200, '')
    $httpBackend.when('GET', /\/api\/logout\?noCache=\d+/)
      .respond(200, '')
    $httpBackend.when('GET', /\/api\/signup\?noCache=\d+/)
      .respond(200, '')
    // Constructor contains http.get
    UserFactory = _UserFactory_
    $httpBackend.flush()
  }))

  describe('factory', function () {
    it('constructor should authenticate without login or register error', function () {
      // authenticated in beforeEach via UserFactory's UserClass constructor
      expect(UserFactory.loginError).to.equal(false)
      expect(UserFactory.registerError).to.equal(false)
    })

    it('logout() should log out user', function () {
      UserFactory.logout()
      $httpBackend.flush()
      expect(UserFactory.loggedin).to.equal(false)
    })

    it('checkLoggedin() should do nothing when logged in', function () {
      UserFactory.checkLoggedin()
      $httpBackend.flush()
    })

    it('should have a user object when logged in', function () {
      UserFactory.checkLoggedin()
      $httpBackend.flush()
      expect(UserFactory.user).to.exist
    })

    // logout() for following tests first because of authentication in constructor
    beforeEach(function () {
      var jwt = localStorage.getItem('JWT')
      expect(jwt).to.not.equal(null)
      UserFactory.logout()
      $httpBackend.flush()
      jwt = localStorage.getItem('JWT')
      expect(jwt).to.equal(null)
    })

    it('checkLoggedOut() should do nothing when logged out', function () {
      UserFactory.checkLoggedOut()
      $httpBackend.flush()
      expect(UserFactory.user).to.be.empty
    })

    it('should have an empty user object when logged out', function () {
      UserFactory.checkLoggedOut()
      $httpBackend.flush()
      expect(UserFactory.user).to.be.empty
    })

    it('login() should throw an error when no credentials passed in', function () {
      try {
        UserFactory.login()
        $httpBackend.flush()
      } catch (err) {
        expect(err).to.exist
      }
    })

    it('login() should store JWT in localStorage', function () {
      $httpBackend.when('POST', '/api/login')
        .respond(200, authResponse)
      UserFactory.login(credentials)
      $httpBackend.flush()
      var jwt = localStorage.getItem('JWT')
      expect(jwt).to.not.equal(null)
    })

    it('signup() should throw an error when no credentials passed in', function () {
      try {
        UserFactory.signup()
        $httpBackend.flush()
      } catch (err) {
        expect(err).to.exist
      }
    })
  })

  describe('controller', function () {
    var UserController

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_
      $httpBackend.when('GET', /\/api\/authenticate\?noCache=\d+/)
        .respond(200, authResponse)
      $httpBackend.when('GET', /modules\/\w+\/[\w\d]+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      var $scope = $rootScope.$new()
      UserController = $controller('UserController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(UserController).to.exist
    })

    // logout() for following tests first because of authentication in constructor
    beforeEach(function () {
      var jwt = localStorage.getItem('JWT')
      expect(jwt).to.not.equal(null)
      UserFactory.logout()
      $httpBackend.flush()
      jwt = localStorage.getItem('JWT')
      expect(jwt).to.equal(null)
    })

    it('vm.login() should login', function () {
      // logged out
      expect(UserFactory.user).to.be.empty

      // login
      $httpBackend.when('POST', '/api/login')
        .respond(200, authResponse)
      angular.extend(UserController, credentials)
      UserController.login(true)
      $httpBackend.flush()

      expect(UserFactory.user).to.not.be.empty
    })

    it('vm.signup() should authenticate', function () {
      // logged out
      expect(UserFactory.user).to.be.empty

      // signup
      angular.extend(UserController, credentials)
      UserController.loginCred.confirmPassword = credentials.loginCred.password
      $httpBackend.when('POST', '/api/signup')
        .respond(200, authResponse)
      UserController.signup(true)
      $httpBackend.flush()

      expect(UserFactory.user).to.not.be.empty
    })

    it('vm.find() should store user in vm', function () {
      // login
      $httpBackend.when('POST', '/api/login')
        .respond(200, authResponse)
      angular.extend(UserController, credentials)
      UserController.login(true)
      $httpBackend.flush()
      UserController.find()
      expect(UserController.editProfile).to.not.be.empty
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
