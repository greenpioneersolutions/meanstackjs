;(function () {
  'use strict'

  angular
    .module('app.core')
    .controller('CoreController', LayoutController)

  LayoutController.$inject = ['config', 'logger']
  /* @ngInject */
  function LayoutController (config, logger) {
    var vm = this
    vm.message = 'layout'
    activate()

    function activate () {
    }
  }
})()
