;(function () {
  'use strict'

  angular
    .module('app.__name__', [])
    .controller('__Name__Controller', __Name__Controller)

  __Name__Controller.$inject = ['$http', '$stateParams', '__Name__Factory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function __Name__Controller ($http, $stateParams, __Name__Factory, logger, $location, UserFactory) {
    var vm = this
    vm.__name__ = {}
    vm.UserFactory = UserFactory
    activate()

    function activate () {

    }
  }
})()
