;(function () {
  'use strict'

  angular
    .module('app.core')
    .run(appRun)

  /* @ngInject */
  function appRun (routerHelper) {
    var otherwise = '/404'
    routerHelper.configureStates(getStates(), otherwise)
  }

  function getStates () {
    return [
      {
        state: '404',
        config: {
          url: '/404',
          templateUrl: 'modules/core/404.view.html',
          title: '404'
        }
      },
      {
        state: '500',
        config: {
          url: '/500',
          templateUrl: 'modules/core/500.view.html',
          title: '500'
        }
      },
      {
        state: 'debug',
        config: {
          url: '/debug',
          templateUrl: 'modules/core/debug.view.html',
          title: 'debug',
          controllerAs: 'vm',
          controller: function (browserInfo) {
            var vm = this
            vm.browserInfo = browserInfo
          }
        }
      }
    ]
  }
})()
