;(function () {
  'use strict'

  angular
    .module('app.header')
    .controller('HeaderController', HeaderController)

  HeaderController.$inject = ['config', 'logger', '$http', 'UserFactory', '$rootScope', '$state']
  /* @ngInject */
  function HeaderController (config, logger, $http, UserFactory, $rootScope, $state) {
    var vm = this
    activate()
    vm.location = 'Header'
    vm.UserFactory = UserFactory
    vm.routes = $state.get()

    vm.logout = function () {
      vm.UserFactory = {}
      UserFactory.logout(vm)
    }

    $rootScope.$on('profileUpdated', function () {
      // if you want to do anything extra
      // vm.UserFactory = _.merge(vm.UserFactory, UserFactory)
    })
    $rootScope.$on('loggedin', function () {
      // if you want to do anything extra
      vm.UserFactory = UserFactory
    })

    $rootScope.$on('logout', function () {
      // if you want to do anything extra
      vm.UserFactory = {}
    })

    function activate () {
    }
  }
})()
