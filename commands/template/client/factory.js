;(function () {
  'use strict'

  angular
    .module('app.<%= name %>')
    .factory('<%= Name %>Factory', <%= Name %>Factory)

  <%= Name %>Factory.$inject = ['$resource']
  /* @ngInject */
  function <%= Name %>Factory ($resource) {
    return $resource('/api/<%= name %>/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
