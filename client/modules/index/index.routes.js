;(function () {
  'use strict'

  angular
    .module('app.index')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'index',
        config: {
          url: '/',
          templateUrl: 'modules/index/index.view.html',
          controller: 'IndexController',
          controllerAs: 'vm'
        }
      }
    ]
  }
})()
