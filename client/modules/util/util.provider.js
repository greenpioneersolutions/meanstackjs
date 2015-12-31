;(function () {
  'use strict'

  angular
    .module('app.util')
    .provider('routerHelper', routerHelperProvider)
    .provider('exceptionHandler', exceptionHandlerProvider)
    .config(config)

  routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider']
  /* @ngInject */
  function routerHelperProvider ($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    }

    $locationProvider.html5Mode(true)

    this.configure = function (cfg) {
      angular.extend(config, cfg)
    }

    this.$get = RouterHelper
    RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger']
    /* @ngInject */
    function RouterHelper ($location, $rootScope, $state, logger) {
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
            if (handlingStateChangeError) {
              return
            }
            stateCounts.errors++
            handlingStateChangeError = true
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target'
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '')
            logger.warning(msg, [toState])
            $location.url('/')
          }
        )
      }

      function init () {
        handleRoutingErrors()
        updateDocTitle()
      }

      function getStates () {
        return $state.get()
      }

      function updateDocTitle () {
        $rootScope.$on('$stateChangeSuccess',
          function (event, toState, toParams, fromState, fromParams) {
            stateCounts.changes++
            handlingStateChangeError = false
            var title = config.docTitle + ' ' + (toState.title || '')
            $rootScope.title = title // data bind to <title>
          }
        )
      }
    }
  }

  /**
   * Must configure the exception handling
   */
  function exceptionHandlerProvider () {
    /* jshint validthis:true */
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

  /**
   * Configure by setting an optional string value for appErrorPrefix.
   * Accessible via config.appErrorPrefix (via config value).
   * @param  {Object} $provide
   */
  /* @ngInject */
  function config ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler)
  }

  extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger']

  /**
   * Extend the $exceptionHandler service to also display a toast.
   * @param  {Object} $delegate
   * @param  {Object} exceptionHandler
   * @param  {Object} logger
   * @return {Function} the decorated $exceptionHandler service
   */
  function extendExceptionHandler ($delegate, exceptionHandler, logger) {
    return function (exception, cause) {
      var appErrorPrefix = exceptionHandler.config.appErrorPrefix || ''
      var errorData = {exception: exception, cause: cause}
      exception.message = appErrorPrefix + exception.message
      $delegate(exception, cause)
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception
       *
       * @example
       *     throw { message: 'error message we added' }
       */
      logger.error(exception.message, errorData)
    }
  }
})()
