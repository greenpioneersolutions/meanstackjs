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
        state: '__name__Create',
        config: {
          url: '/__name__/create',
          templateUrl: 'modules/__name__/create.view.html',
          controller: '__Name__Controller',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: '__name__Edit',
        config: {
          url: '/__name__/edit/:id',
          templateUrl: 'modules/__name__/edit.view.html',
          controller: '__Name__Controller',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: '__name__List',
        config: {
          url: '/__name__/list',
          templateUrl: 'modules/__name__/list.view.html',
          controller: '__Name__Controller',
          controllerAs: 'vm'
        }
      },
      {
        state: '__name__View',
        config: {
          url: '/__name__/view/:id',
          templateUrl: 'modules/__name__/view.view.html',
          controller: '__Name__Controller',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
