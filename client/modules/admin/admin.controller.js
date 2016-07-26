;(function () {
  'use strict'

  angular
    .module('app.admin', [])
    .controller('AdminController', AdminController)

  AdminController.$inject = ['$http', '$stateParams', 'AdminFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function AdminController ($http, $stateParams, AdminFactory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'System'
    vm.admin = {}
    vm.UserFactory = UserFactory
    activate()

    vm.list = function () {
      AdminFactory.query(function (success) {
        vm.admins = success
      }, function (error) {
        logger.error(error.statusText, error, error.data)
      })
    }
    function activate () {
      logger.info('Activated Admin View')
    }
  }
})()
