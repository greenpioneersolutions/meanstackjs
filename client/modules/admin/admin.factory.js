;(function () {
  'use strict'

  angular
    .module('app.admin')
    .factory('AdminUsersFactory', AdminUsersFactory)
    .factory('AdminErrorsFactory', AdminErrorsFactory)

  AdminUsersFactory.$inject = ['$resource']
  AdminErrorsFactory.$inject = ['$resource']
  /* @ngInject */
  function AdminUsersFactory ($resource) {
    return $resource('/api/admin/users/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
  function AdminErrorsFactory ($resource) {
    return $resource('/api/admin/errors/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
