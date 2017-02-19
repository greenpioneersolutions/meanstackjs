;(function () {
  'use strict'

  angular
    .module('app.admin', [])
    .controller('AdminController', AdminController)

  AdminController.$inject = ['$http', '$stateParams', 'AdminUsersFactory', 'AdminErrorsFactory', 'AdminLogsFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function AdminController ($http, $stateParams, AdminUsersFactory, AdminErrorsFactory, AdminLogsFactory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'System'
    vm.view = $stateParams.view ? 'modules/admin/' + $stateParams.view + '.view.html' : 'modules/admin/home.view.html'
    vm.admin = {}
    vm.UserFactory = UserFactory
    vm.listUsers = function () {
      AdminUsersFactory.query(function (success) {
        vm.users = success
      }, function (error) {
        logger.error(error.statusText, error, error.data)
      })
    }
    vm.listErrors = function () {
      AdminErrorsFactory.query(function (success) {
        vm.errors = success
      }, function (error) {
        logger.error(error.statusText, error, error.data)
      })
    }
    vm.listLogs = function () {
      AdminLogsFactory.get(function (success) {
        vm.logs = success
      }, function (error) {
        logger.error(error.statusText, error, error.data)
      })
    }

    activate()
    function activate () {
      vm.listUsers()
      vm.listErrors()
      logger.info('Activated Admin View')
    }
  }
})()
