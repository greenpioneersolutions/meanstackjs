describe('CORE Testing', function () {
  var $injector
  beforeEach(module('app.core'))
  beforeEach(inject(function (_$injector_) {
    $injector = _$injector_
  }))

  describe('route', function () {
    describe('404 route', function () {
      var state404
      beforeEach(inject(function ($state) {
        state404 = $state.get('404')
      }))

      it('should have the correct url', function () {
        expect(state404.url).to.equal('/404')
      })

      it('should have the correct templateUrl', function () {
        expect(state404.templateUrl).to.equal('modules/core/404.view.html')
      })
    })
  })

  describe('config, constants, and values', function () {
    it('should have a registered moment dependency', function () {
      var moment = $injector.get('moment')
      expect(moment).to.exist
    })

    it('should have a registered toastr dependency', function () {
      var toastr = $injector.get('toastr')
      expect(toastr).to.exist
    })

    it('should have a registered lodash dependency', function () {
      var _ = $injector.get('_')
      expect(_).to.exist
    })

    it('should have an app title', function () {
      var config = $injector.get('config')
      expect(config.appTitle).to.exist
    })

    it('should have an app error prefix', function () {
      var config = $injector.get('config')
      expect(config.appErrorPrefix).to.exist
    })

    it('should have toastr timeout configured', function () {
      var toastr = $injector.get('toastr')
      expect(toastr.options.timeOut).to.be.a('number')
    })

    it('should have toastr position class configured', function () {
      var toastr = $injector.get('toastr')
      expect(toastr.options.positionClass).to.be.a('string')
    })
  })

  describe('controller', function () {
    it('should exist', function () {
      inject(function ($rootScope, $controller) {
        var scope = $rootScope.$new()
        var controller = $controller('CoreController', {$scope: scope})
        expect(controller).to.exist
      })
    })
  })

  describe('factories', function () {
    describe('UserFactory', function () {
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
      beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_
      }))
      beforeEach(inject(function (_UserFactory_) {
        $httpBackend.when('GET', /\/api\/authenticate\?noCache=\d+/)
          .respond(200, authResponse)
        $httpBackend.when('GET', /modules\/core\/(\d|\w)+\.view\.html\?noCache=\d+/)
          .respond(200, '')
        $httpBackend.when('GET', /\/api\/logout\?noCache=\d+/)
          .respond(200, '')
        $httpBackend.when('GET', /\/api\/signup\?noCache=\d+/)
          .respond(200, '')
        // Constructor contains http.get
        UserFactory = _UserFactory_
        $httpBackend.flush()
      }))

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
        } catch (e) {
          expect(e).to.exist
        }
      })

      it('login() should store JWT in localStorage', function () {
        $httpBackend.when('POST', '/api/login')
          .respond(200, authResponse)
        UserFactory.login(credentials)
        $httpBackend.flush()
        jwt = localStorage.getItem('JWT')
        expect(jwt).to.not.equal(null)
      })

      it('signup() should throw an error when no credentials passed in', function () {
        try {
          UserFactory.signup()
          $httpBackend.flush()
        } catch (e) {
          expect(e).to.exist
        }
      })
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
