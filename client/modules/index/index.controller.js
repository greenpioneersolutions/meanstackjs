;(function () {
  'use strict'

  angular
    .module('app.index', [])
    .controller('IndexController', IndexController)

  IndexController.$inject = ['logger']
  /* @ngInject */
  function IndexController (logger) {
    var vm = this
    vm.title = 'System'

    activate()

    function activate () {
      logger.info('Activated Index View')
    }
  }
})()
