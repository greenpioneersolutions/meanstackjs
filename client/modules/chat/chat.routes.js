;(function () {
  'use strict'

  angular
    .module('app.chat')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'chat',
        config: {
          url: '/chat',
          templateUrl: 'modules/chat/chat.view.html',
          controller: 'ChatController',
          controllerAs: 'vm'
        }
      }
    ]
  }
})()
