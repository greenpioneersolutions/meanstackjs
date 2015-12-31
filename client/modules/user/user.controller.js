;(function () {
  'use strict'

  angular
    .module('app.user', [])
    .controller('UserController', UserController)

  UserController.$inject = ['$http', 'config', '$location', '$timeout', 'UserFactory', 'logger', 'Upload', '$stateParams']
  /* @ngInject */
  function UserController ($http, config, $location, $timeout, UserFactory, logger, Upload, $stateParams) {
    var vm = this
    vm.resetCred = vm.editProfile = vm.loginCred = vm.loginError = {}
    vm.find = function () {
      vm.editProfile = angular.copy(UserFactory.user)
    }
    vm.login = function () {
      UserFactory.login(vm)
    }
    vm.signup = function () {
      UserFactory.signup(vm)
    }
    vm.forgot = function () {
      UserFactory.forgot(vm)
    }
    vm.resetTokenCheck = function () {
      UserFactory.resetTokenCheck(vm)
    }
    vm.reset = function () {
      UserFactory.resetpassword(vm)
    }
    vm.resetToken = $stateParams.token
    vm.update = function () {
      UserFactory.update(vm)
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
      console.log('Activated UserController View')
    }
  }
})()
