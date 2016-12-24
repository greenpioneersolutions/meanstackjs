;(function () {
  'use strict'

  angular
    .module('app.<%= name %>')
    .factory('<%= Name %>Factory', <%= Name %>Factory)

  <%= Name %>Factory.$inject = []
  /* @ngInject */
  function <%= Name %>Factory () {
    var self = this
    return self
  }
}())
