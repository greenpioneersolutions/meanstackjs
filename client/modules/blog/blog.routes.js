;(function () {
  'use strict'

  angular
    .module('app.blog')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'create',
        config: {
          url: '/blog/create',
          templateUrl: 'modules/blog/create.view.html',
          controller: 'BlogController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'edit',
        config: {
          url: '/blog/edit/:id',
          templateUrl: 'modules/blog/edit.view.html',
          controller: 'BlogController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'list',
        config: {
          url: '/blog/list',
          templateUrl: 'modules/blog/list.view.html',
          controller: 'BlogController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'view',
        config: {
          url: '/blog/view/:id',
          templateUrl: 'modules/blog/view.view.html',
          controller: 'BlogController',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
