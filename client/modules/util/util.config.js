;(function () {
  'use strict'

  var util = angular.module('app.util')
  util.config(interceptors)

  interceptors.$inject = ['$httpProvider']
  /* @ngInject */
  function interceptors ($httpProvider) {
    // $httpProvider.interceptors.push('httpInterceptor')
    // $httpProvider.interceptors.push('noCacheInterceptor')
  }
})()
