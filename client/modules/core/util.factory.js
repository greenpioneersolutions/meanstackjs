;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('logger', logger)
    .factory('exception', exception)
    .factory('httpInterceptor', httpInterceptor)
    .factory('noCacheInterceptor', noCacheInterceptor)

  logger.$inject = ['$log', 'toastr']
  exception.$inject = ['$q', 'logger']
  httpInterceptor.$inject = ['$q', '$location', 'logger']
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
      toastr.error(message.msg || message.message || message, title)
      $log.error('Error: ' + message, data)
    }

    function info (message, data, title) {
      toastr.info(message.msg || message.message || message, title)
      $log.info('Info: ' + message, data)
    }

    function success (message, data, title) {
      toastr.success(message.msg || message.message || message, title)
      $log.info('Success: ' + message, data)
    }

    function warning (message, data, title) {
      toastr.warning(message.msg || message.message || message, title)
      $log.warn('Warning: ' + message, data)
    }
  }
  /* @ngInject */
  function exception ($q, logger) {
    var service = {
      catcher: catcher
    }
    return service

    function catcher (message) {
      return function (e) {
        var thrownDescription
        var newMessage
        if (e.data && e.data.description) {
          thrownDescription = '\n' + e.data.description
          newMessage = message + thrownDescription
          e.data.description = newMessage
        }
        logger.error(newMessage || message, e, 'Uncaught exception')
        return $q.reject(e)
      }
    }
  }

  /* @ngInject */
  function httpInterceptor ($q, $location, $state, logger) {
    return {
      'response': function (response) {
        if (response.status === 402 || response.status === 401) {
          if (response.data.msg) {
            logger.error(response.data.msg, response, 'Error: Unauthorized')
          }
          if (response.data.redirect) $location.path(response.data.redirect || '/signin')
          return $q.reject(response)
        }
        if (response.status === 500 || response.status === 502) {
          if (response.data.msg) {
            logger.error(response.data.msg, response, 'Error: Server error')
          }
          if (response.data.redirect) $location.path('/500')
          // $state.go('500',{data:rejection.data.message})
          return $q.reject(response)
        }
        return response || $q.when(response)
      },

      'responseError': function (rejection) {
        if (rejection.status === 402 || rejection.status === 401) {
          if (rejection.data.msg) {
            logger.error(rejection.data.msg, rejection, 'Error: Unauthorized')
          }
          if (rejection.data.redirect) $location.url(rejection.data.redirect || '/signin')
          return $q.reject(rejection)
        }
        if (rejection.status === 500 || rejection.status === 502) {
          if (rejection.data.msg) {
            logger.error(rejection.data.msg, rejection, 'Error: Server error')
          }
          if (rejection.data.redirect) $location.url('/500')
          // $state.go('500',{data:rejection.data.message})
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
