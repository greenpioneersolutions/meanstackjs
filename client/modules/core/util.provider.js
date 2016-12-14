;(function () {
  'use strict'

  angular
    .module('app.core')
    .provider('routerHelper', routerHelperProvider)
    .provider('exceptionHandler', exceptionHandlerProvider)
    .config(config)

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider']

  /* @ngInject */
  function routerHelperProvider ($locationProvider, $stateProvider, $urlRouterProvider) {
    var config = {
      resolveAlways: {}
    }

    $locationProvider.html5Mode(true)

    this.configure = function (cfg) {
      angular.extend(config, cfg)
    }

    this.$get = RouterHelper

    RouterHelper.$inject = ['$rootScope', '$state', 'logger', '$location', '$http']

    /* @ngInject */
    function RouterHelper ($rootScope, $state, logger, $location, $http) {
      var handlingStateChangeError = false
      var hasOtherwise = false
      var stateCounts = {
        errors: 0,
        changes: 0
      }

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      }

      init()

      return service

      function configureStates (states, otherwisePath) {
        states.forEach(function (state) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways)
          $stateProvider.state(state.state, state.config)
        })
        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true
          $urlRouterProvider.otherwise(otherwisePath)
        }
      }

      function handleRoutingErrors () {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) return

            stateCounts.errors++
            handlingStateChangeError = true
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target'
            var msg = 'Error routing to ' + destination + '. '
            if (error.data && error.statusText) {
              msg += (error.data || '') + '. \n' + (error.statusText || '') +
                ': ' + (error.status || '')
            }

            logger.warning(msg, [toState])
            $state.go('index')
          }
        )
      }

      function init () {
        handleRoutingErrors()
        updateupdateSeo()
      }

      function getStates () {
        return $state.get()
      }

      function updateupdateSeo () {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
            $http.get('/api/seo' + $location.$$url).then(function (success) {
              $rootScope.seo = success.data
            })
            stateCounts.changes++
            handlingStateChangeError = false
          }
        )
      }
    }
  }

  function exceptionHandlerProvider () {
    this.config = {
      appErrorPrefix: undefined
    }

    this.configure = function (appErrorPrefix) {
      this.config.appErrorPrefix = appErrorPrefix
    }

    this.$get = function () {
      return {config: this.config}
    }
  }

  config.$inject = ['$provide']
  function config ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler)
  }

  extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger']
  function extendExceptionHandler ($delegate, exceptionHandler, logger) {
    return function (exception, cause) {
      $delegate(exception, cause)
      logger.error(exception.message || exception, {exception: exception, cause: cause})
    }
  }
})()
