;(function () {
  'use strict'

  angular
    .module('app.blog')
    .factory('BlogFactory', BlogFactory)

  BlogFactory.$inject = ['$resource']
  /* @ngInject */
  function BlogFactory ($resource) {
    return $resource('/api/blog/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
