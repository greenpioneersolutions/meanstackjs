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

      $http.get('/api/user/authenticate').then(function (success) {
        if (success.data) {
          if (!_.isEmpty(success.data.user)) {
            localStorage.setItem('JWT', success.data.token)
          }
          $timeout(deferred.resolve(success.data))
        } else {
          $timeout(deferred.reject({message: 'No Response'}))
        }
      }, function (error) {
        $timeout(deferred.reject(error))
      })
      return deferred.promise
    }

    function UserClass () {
      self = this
      self.name = 'users'
      self.user = {}
      self.token
      self.loggedin = false
      self.isAdmin = false

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
        } else {
          // Not Authenticated
          $state.go('signin')
          logger.error('Not Authenticated', data, 'Login')
        }
      })
    }
    UserClass.prototype.login = function (vm) {
      $http.post('/api/user/authenticate', {
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

      self.user = data.user
      self.token = data.token
      self.loggedin = data.authenticated
      if (self.user.roles) {
        self.isAdmin = self.user.roles.indexOf('admin') > -1
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
      logger.error(error.data.message, error, 'Login/Signup')
      $rootScope.$emit('loginfailed')
      $rootScope.$emit('registerfailed')
      return ({
        error: true
      })
    }

    UserClass.prototype.updateProfile = function (data, response) {
      self.user = data
      logger.success(self.user.profile.name + ' your profile has be saved', self.user, 'Updated Profile')
      $rootScope.$emit('profileUpdated')
    }
    UserClass.prototype.error = function (error) {
      logger.error(error.data, error, 'User Error')
    }
    UserClass.prototype.update = function (vm) {
      $http.put('/api/user/profile', vm.editProfile)
        .then(self.updateProfile.bind(this, vm.editProfile), self.error.bind(this))
    }
    UserClass.prototype.signup = function (vm) {
      if (vm.loginCred.password === vm.loginCred.confirmPassword) {
        if ($stateParams.redirect)vm.loginCred.redirect = $stateParams.redirect
        $http.post('/api/user/signup', vm.loginCred)
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
      $http.get('/api/user/reset/' + vm.resetToken)
        .then(
          function (response) {
            if (response.data.valid) {
              vm.tokenCheck = false
            }
          }, function (response) {
            logger.error(response.data.message)
            vm.tokenCheck = true
          }
      )
    }
    UserClass.prototype.resetpassword = function (vm) {
      $http.post('/api/user/reset/' + vm.resetToken, {
        password: vm.resetCred.password,
        confirmPassword: vm.resetCred.confirmPassword
      }).then(self.onIdentity.bind(this), self.onIdFail.bind(this))
        .then(function (response) {
          if (!response.error) {
            logger.success('Password successfully Reset', response)
          }
        })
    }

    UserClass.prototype.forgot = function (vm) {
      $http.post('/api/user/forgot', {
        email: vm.forgot.email
      }).then(function (response) {
        $rootScope.$emit('forgotmailsent', response)
        logger.success(vm.forgot.email, vm.forgot.email, ' Reset Token has been sent to your email')
        vm.clicked = true
        vm.forgot.email = ''
      }, self.onIdFail.bind(this))
    }

    UserClass.prototype.logout = function (vm) {
      $http.post('/api/user/logout').then(function (data) {
        localStorage.removeItem('JWT')
        $rootScope.$emit('logout')
        // ANGULAR WAY
        $state.go('index')
        // ENTERPRISE WAY TO SUPPORT ALL OLDER BROWSERS
        // var indexState = $state.get('index')
        // window.location.href = indexState ? indexState.url : '/'
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
    UserClass.prototype.resetApiToken = function () {
      $http.get('/api/user/token/reset').then(function (success) {
        self.token = success.data.token
        localStorage.setItem('JWT', self.token)
      }, function (error) {
        logger.error('Unable to reset API Token', error, 'Server Error')
      })
    }

    return UserFactory
  }
}())
