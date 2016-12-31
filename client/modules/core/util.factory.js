;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('logger', logger)
    .factory('httpInterceptor', httpInterceptor)
    .factory('noCacheInterceptor', noCacheInterceptor)

  logger.$inject = ['$log', 'toastr']
  httpInterceptor.$inject = ['$q', '$location', 'logger', '$injector']
  noCacheInterceptor.$inject = []
  /* @ngInject */
  function logger ($log, toastr) {
    var service = {
      showToasts: true,
      error: error,
      info: info,
      success: success,
      warning: warning,
      log: $log.log // straight to console; bypass toastr
    }

    return service

    function error (message, data, title) {
      if (message)toastr.error(message, title)
      $log.error('Error: ' + message, data)
    }

    function info (message, data, title) {
      if (message)toastr.info(message, title)
      $log.info('Info: ' + message, data)
    }

    function success (message, data, title) {
      if (message)toastr.success(message, title)
      $log.info('Success: ' + message, data)
    }

    function warning (message, data, title) {
      if (message)toastr.warning(message, title)
      $log.warn('Warning: ' + message, data)
    }
  }

  /* @ngInject */
  function httpInterceptor ($q, $location, logger, $injector) {
    return {
      'response': function (response) {
        if (response.status === 402 || response.status === 401) {
          if (response.data.message) {
            logger.error(response.data.message, response, 'Error: Unauthorized')
          }
          if (response.data.redirect) $location.path(response.data.redirect || '/signin')
          return $q.reject(response)
        }
        if (response.status === 500 || response.status === 502) {
          if (response.data.message) {
            logger.error(response.data.message, response, 'Error: Server error')
          }
          if (response.data.redirect) $location.path('/500')
          // $state.go('500',{data:rejection.data.message})
          return $q.reject(response)
        }
        return response || $q.when(response)
      },

      'responseError': function (rejection) {
        if (rejection.status === 402 || rejection.status === 401) {
          if (rejection.data.message) {
            logger.error(rejection.data.message, rejection, 'Error: Unauthorized')
          }
          if (rejection.data.redirect) $location.url(rejection.data.redirect || '/signin')
          return $q.reject(rejection)
        }
        if (rejection.status === 500 || rejection.status === 502) {
          if (rejection.data.message) {
            logger.error(rejection.data.message, rejection, 'Error: Server error')
          }
          if (rejection.data.redirect) $location.url('/500')
          // If you wish to redirect to 500 error page uncomment the line out below
          // http://stackoverflow.com/a/20230786 - use injector stackoverflow
          // $injector.get('$state').go('500', {error: rejection.data})
          return $q.reject(rejection)
        }
        return $q.reject(rejection)
      }

    }
  }
  /* @ngInject */
  function noCacheInterceptor () {
    return {
      request: function (config) {
        var n = config.url.search(/template|modal|Modal/i)
        if (n === -1) {
          if (config.method === 'GET') {
            var separator = config.url.indexOf('?') === -1 ? '?' : '&'
            config.url = config.url + separator + 'noCache=' + new Date().getTime()
          }
        }
        return config
      }
    }
  }
}())
