;(function () {
  'use strict'

  angular
    .module('app.core')
    .directive('ngEnter', ngEnter)

  function ngEnter () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          setTimeout(function () {
            // added set time because of the digest loop
            scope.$apply(function () {
              scope.$eval(attrs.ngEnter)
            })
          })
          event.preventDefault()
        }
      })
    }
  }
})()
