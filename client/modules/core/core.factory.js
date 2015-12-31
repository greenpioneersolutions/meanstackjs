;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('UserFactory', UserFactory)

  UserFactory.$inject = ['$rootScope', '$http', '$location', '$stateParams', '$cookies', '$q', '$timeout', 'logger']

  /* @ngInject */
  function UserFactory ($rootScope, $http, $location, $stateParams, $cookies, $q, $timeout, logger) {
    var self
    var UserFactory = new UserClass()

    function UserClass () {
      this.name = 'users'
      this.user = {}
      this.registerForm = false
      this.loggedin = false
      this.isAdmin = false
      this.loginError = 0
      this.usernameError = null
      this.registerError = null
      this.resetpassworderror = null
      this.validationError = null
      self = this
      $http.get('/api/login').success(function (response) {
        if (!response && $cookies.get('token') && $cookies.get('redirect')) {
          self.onIdentity.bind(self)({
            token: $cookies.get('token'),
            redirect: $cookies.get('redirect').replace(/^"|"$/g, '')
          })
          $cookies.remove('token')
          $cookies.remove('redirect')
        } else {
          self.onIdentity.bind(self)(response)
        }
      })
    }

    UserClass.prototype.onIdentity = function (response) {
      if (!response) return ({error: true})

      var destination, data
      destination = angular.isDefined(response.redirect || response.data) ? response.redirect || response.data.redirect : false
      data = response.data || response
      this.loggedin = data.authenticated
      this.user = data.user
      this.loginError = 0
      this.registerError = 0
      if (this.user.roles)this.isAdmin = this.user.roles.indexOf('admin') > -1
      $rootScope.$emit('loggedin')
      if (destination) {
        $location.url(destination)
      }
      return ({
        error: false
      })
    }

    UserClass.prototype.onIdFail = function (error) {
      logger.error(error.data, error, 'Login')
      // $location.url(response.redirect)
      this.loginError = 'Authentication failed.'
      this.registerError = error
      $rootScope.$emit('loginfailed')
      $rootScope.$emit('registerfailed')
      return ({
        error: true
      })
    }
    UserClass.prototype.editProfile = function (vm) {
      var deferred = $q.defer()

      $http.get('/api/login').then(function (success) {
        // Authenticated
        if (success.data !== '0') {
          console.log(success.data)
          vm.editProfile = success.data
          $timeout(deferred.resolve)
        } else { // Not Authenticated
          $cookies.put('redirect', $location.url())
          $timeout(deferred.reject)
          $location.url('/login')
          logger.error('Not Authenticated', success, 'Login')
        }
      }, function (error) {
        console.log(error)
      })

      return deferred.promise
    }
    UserClass.prototype.login = function (vm) {
      $http.post('/api/login', {
        email: vm.loginCred.email,
        password: vm.loginCred.password,
        redirect: '/'
      }).then(
        this.onIdentity.bind(this),
        this.onIdFail.bind(this)
      ).then(function (response) {
        if (!response.error) {
          logger.success(vm.loginCred.email, vm.loginCred, ' successfully logged in')
        }
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
      $http.post('/api/account/profile', vm.editProfile)
        .then(this.updateProfile.bind(this), this.error.bind(this))
    // logger.error(error.data, error, 'Login')
    }
    UserClass.prototype.signup = function (vm) {
      if (vm.loginCred.password === vm.loginCred.confirmPassword) {
        this.redirect = '/time/list'
        $http.post('/api/signup', vm.loginCred)
          .then(this.onIdentity.bind(this), this.onIdFail.bind(this))
          .then(function (response) {
            if (!response.error) {
              logger.success(vm.loginCred.name, vm.loginCred, ' successfully signed up')
              vm.loginCred = {}
            }
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
              // console do nothing cause its valid
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
      $http.get('/api/logout').success(function (data) {
        // localStorage.removeItem('JWT')
        $rootScope.$emit('logout')
        $location.url('/')
      // this.user = {}
      })
    }

    UserClass.prototype.checkLoggedin = function () {
      var deferred = $q.defer()
      // Make an AJAX call to check if the user is logged in
      $http.get('/api/login').success(function (data) {
        // Authenticated
        if (data.authenticated !== false) {
          $timeout(deferred.resolve)
        } else { // Not Authenticated
          $cookies.put('redirect', $location.url())
          $timeout(deferred.reject)
          $location.url('/signin')
          logger.error('please sign in', {user: 'No User'}, 'Unauthenticated')
        }
      })

      return deferred.promise
    }

    UserClass.prototype.checkLoggedOut = function () {
      var deferred = $q.defer()

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/login').success(function (data) {
        // Authenticated
        if (data.authenticated !== false) {
          $timeout(deferred.reject)
          logger.error(data.user.profile.name + ' You are already signed in', data.user, 'Authenticated Already')
          $location.url('/')
        }
        // Not Authenticated
        else $timeout(deferred.resolve)
      })

      return deferred.promise
    }

    UserClass.prototype.checkAdmin = function () {
      var deferred = $q.defer()

      $http.get('/api/login').success(function (data) {
        // Authenticated
        if (data.authenticated !== '0' && data.user.roles.indexOf('admin') !== -1) $timeout(deferred.resolve)
        // Not Authenticated or not Admin
        else {
          $timeout(deferred.reject)
          $location.url('/')
        }
      })

      return deferred.promise
    }
    return UserFactory
  }
}())
