;(function () {
  'use strict'

  angular
    .module('app.user')
    .factory('UserFactory', UserFactory)

  UserFactory.$inject = ['$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q', '$timeout', 'logger', 'jwtHelper', '$state']

  /* @ngInject */
  function UserFactory ($rootScope, $http, $location, $stateParams, $cookies, $q, $timeout, logger, jwtHelper, $state) {
    var self
    var UserFactory = new UserClass()

    // function getToken (token) {
    //   return jwtHelper.decodeToken(token)
    // }
    function getAuthenticate () {
      var deferred = $q.defer()

      $http.get('/api/authenticate').then(function (success) {
        if (success.data) {
          if (!_.isEmpty(success.data.user)) {
            localStorage.setItem('JWT', success.data.token)
            success.data.user = success.data.user
          }
          $timeout(deferred.resolve(success.data))
        } else {
          $timeout(deferred.reject({msg: 'No Response'}))
        }
      }, function (error) {
        $timeout(deferred.reject(error))
      })
      return deferred.promise
    }

    function UserClass () {
      this.name = 'users'
      this.user = {}
      this.registerForm = false
      this.loggedin = false
      this.isAdmin = false
      this.loginError = false
      this.usernameError = false
      this.registerError = false
      this.resetpassworderror = false
      this.validationError = false
      self = this
      getAuthenticate().then(function (data) {
        if (!data && $cookies.get('token') && $cookies.get('redirect')) {
          self.onIdentity.bind(self)({
            token: $cookies.get('token'),
            redirect: $cookies.get('redirect').replace(/^"|"$/g, '')
          })
          $cookies.remove('token')
          $cookies.remove('redirect')
        } else {
          self.onIdentity.bind(self)(data)
        }
      })
    }
    UserClass.prototype.editProfile = function (vm) {
      getAuthenticate().then(function (data) {
        if (data !== '0') {
          vm.editProfile = data
        } else { // Not Authenticated
          $state.go('signin')
          logger.error('Not Authenticated', data, 'Login')
        }
      })
    }
    UserClass.prototype.login = function (vm) {
      $http.post('/api/login', {
        email: vm.loginCred.email,
        password: vm.loginCred.password,
        redirect: $stateParams.redirect || '/'
      }).then(function (success) {
        if (!_.isEmpty(success.data.user)) {
          localStorage.setItem('JWT', success.data.token)
          success.data.user = success.data.user
        }
        self.onIdentity.bind(self)(success.data)
      }, function (error) {
        self.onIdFail.bind(self)(error)
      })
    }
    UserClass.prototype.onIdentity = function (data) {
      if (!data) return ({error: true})

      this.user = data.user
      this.loggedin = data.authenticated
      this.loginError = false
      this.registerError = false
      if (this.user.roles) {
        this.isAdmin = this.user.roles.indexOf('admin') > -1
      }
      if (data.redirect ? data.redirect : false) {
        $location.url(data.redirect)
      }
      $rootScope.$emit('loggedin')
      return ({
        error: false
      })
    }

    UserClass.prototype.onIdFail = function (error) {
      logger.error(error.data.msg || error.data.message, error, 'Login/Signup')
      this.loginError = 'Authentication failed.'
      this.registerError = error
      $rootScope.$emit('loginfailed')
      $rootScope.$emit('registerfailed')
      return ({
        error: true
      })
    }

    UserClass.prototype.updateProfile = function (response) {
      var data = response.data || response
      logger.success(data.user.profile.name + ' your profile has be saved', data, 'Updated Profile')
      this.user = response.data.user
      $rootScope.$emit('profileUpdated')
    }
    UserClass.prototype.error = function (error) {
      logger.error(error.data, error, 'User Error')
    }
    UserClass.prototype.update = function (vm) {
      $http.put('/api/account/profile', vm.editProfile)
        .then(this.updateProfile.bind(this), this.error.bind(this))
    }
    UserClass.prototype.signup = function (vm) {
      if (vm.loginCred.password === vm.loginCred.confirmPassword) {
        if ($stateParams.redirect)vm.loginCred.redirect = $stateParams.redirect
        $http.post('/api/signup', vm.loginCred)
          .then(function (success) {
            if (!_.isEmpty(success.data.user)) {
              localStorage.setItem('JWT', success.data.token)
              success.data.user = success.data.user
            }
            success.data.redirect = '/'
            self.onIdentity.bind(self)(success.data)
          }, function (error) {
            self.onIdFail.bind(self)(error)
          })
      } else {
        logger.error(' passwords dont match', 'passwords dont match', 'Error')
      }
    }
    UserClass.prototype.resetTokenCheck = function (vm) {
      $http.get('/api/reset/' + vm.resetToken)
        .then(
          function (response) {
            if (response.data.valid) {
              vm.tokenCheck = false
            }
          }, function (response) {
            logger.error(response.data.msg)
            vm.tokenCheck = true
          }
      )
    }
    UserClass.prototype.resetpassword = function (vm) {
      $http.post('/api/reset/' + vm.resetToken, {
        password: vm.resetCred.password,
        confirmPassword: vm.resetCred.confirmPassword
      }).then(this.onIdentity.bind(this), this.onIdFail.bind(this))
        .then(function (response) {
          if (!response.error) {
            logger.success('Password successfully Reset', response)
          }
        })
    }

    UserClass.prototype.forgot = function (vm) {
      $http.post('/api/forgot', {
        email: vm.forgot.email
      }).then(function (response) {
        $rootScope.$emit('forgotmailsent', response)
        logger.success(vm.forgot.email, vm.forgot.email, ' Reset Token has been sent to your email')
        vm.clicked = true
        vm.forgot.email = ''
      }, this.onIdFail.bind(this))
    }

    UserClass.prototype.logout = function (vm) {
      $http.get('/api/logout').then(function (data) {
        localStorage.removeItem('JWT')
        $rootScope.$emit('logout')
        $state.go('index')
        self.user = {}
        self.loggedin = false
      })
    }

    UserClass.prototype.checkLoggedin = function () {
      getAuthenticate().then(function (data) {
        if (data.authenticated === false) {
          $state.go('signin', {'redirect': $location.path()})
          logger.error('please sign in', {user: 'No User'}, 'Unauthenticated')
        }
      })
    }

    UserClass.prototype.checkLoggedOut = function () {
      getAuthenticate().then(function (data) {
        if (data.authenticated !== false) {
          logger.error(data.user.profile.name + ' You are already signed in', data.user, 'Authenticated Already')
          $state.go('index')
        }
      })
    }

    UserClass.prototype.checkAdmin = function () {
      getAuthenticate().then(function (data) {
        var roles = true
        if (data.user.roles && _.isArray(data.user.roles))roles = data.user.roles.indexOf('admin') === -1
        if (data.authenticated !== true || roles) {
          $state.go('index')
          logger.error('requires access', {user: 'No User'}, 'Unauthorized')
        }
      })
    }
    return UserFactory
  }
}())
