;(function () {
  'use strict'

  angular
    .module('app.footer')
    .controller('FooterController', FooterController)

  FooterController.$inject = ['config', 'logger']
  /* @ngInject */
  function FooterController (config, logger) {
    var vm = this
    vm.message = 'footer'
    activate()

    function activate () {
    }
  }
})()
