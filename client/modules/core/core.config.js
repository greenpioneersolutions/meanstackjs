;(function () {
  'use strict'

  var core = angular.module('app.core')

  core.config(toastrConfig)
  core.constant('toastr', toastr)
  core.constant('moment', moment)
  core.constant('_', _)
  toastrConfig.$inject = ['toastr']
  /* @ngInject */
  function toastrConfig (toastr) {
    toastr.options.timeOut = 4000
    toastr.options.positionClass = 'toast-bottom-right'
  }

  /*  $window change out */
  var config = {
    appErrorPrefix: 'MeanStackJS',
    appTitle: 'MeanStackJS',
    user: window.user
  }

  core.value('config', config)

  core.config(configure)

  configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider']
  /* @ngInject */
  function configure ($logProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true)
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix)
    routerHelperProvider.configure({docTitle: config.appTitle + ': '})
  }
})()
