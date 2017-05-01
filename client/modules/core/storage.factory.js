;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('$localStorage', localStorage)

  localStorage.$inject = ['$window']

  function localStorage ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || false
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value)
      },
      getObject: function (key) {
        if ($window.localStorage[key] !== undefined) {
          return JSON.parse($window.localStorage[key] || false)
        }
        return false
      },
      remove: function (key) {
        $window.localStorage.removeItem(key)
      },
      clear: function () {
        $window.localStorage.clear()
      }
    }
  }
}())
