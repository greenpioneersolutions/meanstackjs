;(function () {
  'use strict'

  angular
    .module('app.__name__')
    .factory('__Name__Factory', __Name__Factory)

  __Name__Factory.$inject = ['$resource']
  /* @ngInject */
  function __Name__Factory ($resource) {
    return $resource('/api/__name__/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
