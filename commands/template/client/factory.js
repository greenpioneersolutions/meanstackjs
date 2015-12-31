;(function () {
  'use strict'

  angular
    .module('app.__name__')
    .factory('__Name__Factory', __Name__Factory)

  __Name__Factory.$inject = ['$resource']
  /* @ngInject */
  function __Name__Factory ($resource) {
    return $resource('/api/v1/__Name__/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
