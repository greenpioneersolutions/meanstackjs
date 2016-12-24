;(function () {
  'use strict'

  angular
    .module('app.__name__')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: '__name__View',
        config: {
          url: '/__name__/view',
          templateUrl: 'modules/__name__/view.view.html',
          controller: '__Name__Controller',
          controllerAs: 'vm'
        }
      }
    ]
  }
})()
