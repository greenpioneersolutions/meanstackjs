;(function () {
  'use strict'

  angular
    .module('app.<%= name %>', [])
    .controller('<%= Name %>Controller', <%= Name %>Controller)
    
  <%= Name %>Controller.$inject = ['$http', '$stateParams', '<%= Name %>Factory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function <%= Name %>Controller ($http, $stateParams, <%= Name %>Factory, logger, $location, UserFactory) {
    var vm = this
    vm.<%= name %> = {}
    vm.UserFactory = UserFactory
    activate()

    function activate () {

    }
  }
})()
