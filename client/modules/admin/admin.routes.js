;(function () {
  'use strict'

  angular
    .module('app.admin')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'adminDashboard',
        config: {
          url: '/admin?view',
          templateUrl: 'modules/admin/view.view.html',
          controller: 'AdminController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkAdmin()
            }
          }
        }
      }
    ]
  }
})()
