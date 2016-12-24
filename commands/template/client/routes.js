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
        state: '<%= name %>Create',
        config: {
          url: '/<%= name %>/create',
          templateUrl: 'modules/<%= name %>/create.view.html',
          controller: '<%= Name %>Controller',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: '<%= name %>Edit',
        config: {
          url: '/<%= name %>/edit/:id',
          templateUrl: 'modules/<%= name %>/edit.view.html',
          controller: '<%= Name %>Controller',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: '<%= name %>List',
        config: {
          url: '/<%= name %>/list',
          templateUrl: 'modules/<%= name %>/list.view.html',
          controller: '<%= Name %>Controller',
          controllerAs: 'vm'
        }
      },
      {
        state: '<%= name %>View',
        config: {
          url: '/<%= name %>/view/:id',
          templateUrl: 'modules/<%= name %>/view.view.html',
          controller: '<%= Name %>Controller',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
