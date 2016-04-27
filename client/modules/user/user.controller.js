;(function () {
  'use strict'

  angular
    .module('app.user', [])
    .controller('UserController', UserController)

  UserController.$inject = ['$scope', '$http', '$cookies', 'config', '$state', '$timeout', 'UserFactory', 'logger', 'Upload', '$stateParams']

  /* @ngInject */
  function UserController ($scope, $http, $cookies, config, $state, $timeout, UserFactory, logger, Upload, $stateParams) {
    var vm = this
    vm.resetCred = vm.editProfile = vm.loginCred = vm.loginError = {}
    vm.find = function () {
      vm.editProfile = angular.copy(UserFactory.user)
    }
    vm.login = function (validated) {
      if (validated) UserFactory.login(vm)
      else logger.warning('Data not valid', vm, 'Login Validation')
    }
    vm.signup = function (validated) {
      if (validated) UserFactory.signup(vm)
      else logger.warning('Data not valid', vm, 'Signup Validation')
    }
    vm.forgot = function (validated) {
      if (validated) UserFactory.forgot(vm)
      else logger.warning('Data not valid', vm, 'Forgot Password Validation')
    }
    vm.resetTokenCheck = function () {
      UserFactory.resetTokenCheck(vm)
    }
    vm.reset = function (validated) {
      if (validated) UserFactory.resetpassword(vm)
      else logger.warning('Data not valid', vm, 'Reset Password Validation')
    }
    vm.resetToken = $stateParams.token
    vm.update = function (validated) {
      if (validated) UserFactory.update(vm)
      else logger.warning('Data not valid', vm, 'Profile Validation')
    }
    vm.upload = function (file) {
      Upload.upload({
        url: '/api/photos/upload',
        data: {file: file, 'user': UserFactory}
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data)
      }, function (resp) {
        console.log('Error status: ' + resp.status)
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total) // eslint-disable-line
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
      })
    }
    activate()

    function activate () {
      // Handle redirects
      $scope.$on('$stateChangeSuccess', function (ev, toState, toParams, fromState, fromParams) {
        var redirectPath = $state.href(fromState.name, fromParams)
        $cookies.put('redirect', redirectPath)
      })
    }
  }
})()
