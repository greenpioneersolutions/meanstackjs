describe('USER Testing', function () {
  var UserFactory
  var $httpBackend
  var authResponse = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Nzk2ZDYyYzUyNDA4ZWRjMDRjYTM4ZTciLCJpYXQiOjE0NzE0MDg3MDgsImV4cCI6MTQ3MTQxNTkwOH0.hBZqRf7fapH74H9FAfb3GC0IHHNYe6lV_ydd-SrmUe4',
    user: {
      'profile': {
        'gender': 'Male',
        'location': 'International',
        'website': 'google.com',
        'picture': '',
        'name': 'Test User'
      },
      'roles': [],
      'gravatar': 'https://gravatar.com/avatar/d5bb4ffffa6a32428c7e310c341b4f7b?s=200&d=retro',
      'email': 'test@user.com',
      '_id': '5717a2d50b5e44aa5e54648b'
    }
  }
  var credentials = {
    loginCred: {
      email: 'test@user.com',
      password: 'testuser11!@'
    }
  }

  beforeEach(module('app.core'))
  beforeEach(module('app.index'))
  beforeEach(module('app.user'))
  beforeEach(inject(function (_$httpBackend_, _$location_, _UserFactory_) {
    $httpBackend = _$httpBackend_
    $httpBackend.when('GET', /\/api\/user\/authenticate\?noCache=\d+/)
      .respond(200, authResponse)
    $httpBackend.when('GET', /\/api\/seo\/*/)
        .respond(200, {})
    $httpBackend.when('GET', /modules\/[\d\w]+\/[\d\w]+\.view\.html\?noCache=\d+/)
      .respond(200, '')
    $httpBackend.when('GET', /modules\/index\/[\d\w]+\.view\.html\?noCache=\d+/)
      .respond(200, '')
    $httpBackend.when('GET', /\/api\/user\/logout\?noCache=\d+/)
      .respond(200, '')
    // Constructor contains http.get
    UserFactory = _UserFactory_
    $httpBackend.flush()
  }))

  describe('factory', function () {
    it('logout() should log out user', function () {
      UserFactory.logout()
      $httpBackend.flush()
      expect(UserFactory.loggedin).to.equal(false)
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
      expect(UserFactory.user).to.be.empty
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
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('signup() should throw an error when no credentials passed into function', function () {
      $httpBackend.when('POST', '/api/signup')
        .respond(200, '')
      try {
        UserFactory.signup()
        $httpBackend.flush()
      } catch (error) {
        expect(error).to.exist
      }
    })

    it('login() should store JWT in localStorage', function () {
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      UserFactory.login(credentials)
      $httpBackend.flush()
      var jwt = localStorage.getItem('JWT')
      expect(jwt).to.not.equal(null)
    })

    it('login() should store user in user object', function () {
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      UserFactory.login(credentials)
      $httpBackend.flush()
      expect(UserFactory.user).to.not.be.empty
    })

    it('should have a non-empty user object when logged in', function () {
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      UserFactory.login(credentials)
      $httpBackend.flush()
      expect(UserFactory.user).to.not.be.empty
    })

    it('checkLoggedin() should do nothing when logged in', function () {
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      UserFactory.login(credentials)
      $httpBackend.flush()
      expect(UserFactory.user).to.not.be.empty
      UserFactory.checkLoggedin()
      $httpBackend.flush()
      expect(UserFactory.user).to.not.be.empty
    })
  })

  describe('controller', function () {
    var UserController

    beforeEach(inject(function ($rootScope, $controller) {
      var $scope = $rootScope.$new()
      UserController = $controller('UserController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(UserController).to.exist
    })

    it('vm.login() should login', function () {
      // log out
      UserFactory.logout()
      $httpBackend.flush()
      expect(UserFactory.user).to.be.empty

      // login
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      angular.extend(UserController, credentials)
      UserController.login(true)
      $httpBackend.flush()

      expect(UserFactory.user).to.not.be.empty
    })

    it('vm.signup() should authenticate', function () {
      // log out
      UserFactory.logout()
      $httpBackend.flush()
      expect(UserFactory.user).to.be.empty

      // signup
      angular.extend(UserController, credentials)
      UserController.loginCred.confirmPassword = credentials.loginCred.password
      $httpBackend.when('POST', '/api/user/signup')
        .respond(200, authResponse)
      UserController.signup(true)
      $httpBackend.flush()

      expect(UserFactory.user).to.not.be.empty
    })

    it('vm.forgot() should not fail and should reset email form input after success', function () {
      // log out
      UserFactory.logout()
      $httpBackend.flush()
      expect(UserFactory.user).to.be.empty

      var payload = {email: 'testuser@test.com'}

      $httpBackend.when('POST', '/api/user/forgot')
        .respond(200, authResponse)

      // Simulate setting form input field
      UserController.forgot.email = payload.email

      UserController.forgot(true)
      $httpBackend.flush()
      expect(UserController.forgot.email).to.be.empty
    })

    // it('vm.reset() should not fail', function () {
    //   var resetToken = 'e937d89281c5172cae7a4469a46'
    //
    //   // Simulate setting form input field
    //   UserController.resetCred = {}
    //   UserController.resetCred.password = 'testuser2!'
    //   UserController.resetCred.confirmPasword = 'testuser2!'
    //   UserController.resetToken = resetToken
    //
    //   $httpBackend.when('POST', /\/api\/reset\/[\w\d]+/)
    //     .respond(200, authResponse)
    //   UserController.reset(true)
    //   $httpBackend.flush()
    //
    // })

    // Ensure logged in for following test cases
    beforeEach(function () {
      // login
      $httpBackend.when('POST', '/api/user/authenticate')
        .respond(200, authResponse)
      angular.extend(UserController, credentials)
      UserController.login(true)
      $httpBackend.flush()
    })

    it('vm.update() should update user correctly', function () {
      UserController.editProfile = {profile: {}}

      // Simulate setting form input fields
      UserController.editProfile.email = 'test@user.com'
      UserController.editProfile.profile.name = 'Test User'
      UserController.editProfile.profile.gender = 'Male'
      UserController.editProfile.profile.location = 'New York'

      $httpBackend.when('PUT', '/api/user/profile')
        .respond({
          user: {
            email: 'test@user.com',
            profile: {
              name: 'Test User',
              gender: 'Male',
              location: 'New York'
            }
          }
        })
      UserController.update(true)
      $httpBackend.flush()
      expect(UserFactory.user.email).to.equal('test@user.com')
      expect(UserFactory.user.profile.name).to.equal('Test User')
      expect(UserFactory.user.profile.gender).to.equal('Male')
      expect(UserFactory.user.profile.location).to.equal('New York')
    })

    it('vm.find() should store user in vm', function () {
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
