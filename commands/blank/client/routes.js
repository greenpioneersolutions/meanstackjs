;(function () {
  'use strict'

  angular
    .module('app.<%= name %>')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: '<%= name %>View',
        config: {
          url: '/<%= name %>/view',
          templateUrl: 'modules/<%= name %>/view.view.html',
          controller: '<%= Name %>Controller',
          controllerAs: 'vm'
        }
      }
    ]
  }
})()
