;(function () {
  'use strict'

  angular
    .module('app.admin')
    .factory('AdminFactory', AdminFactory)

  AdminFactory.$inject = ['$resource']
  /* @ngInject */
  function AdminFactory ($resource) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
