;(function () {
  'use strict'

  angular
    .module('app.util')
    .factory('logger', logger)
    .factory('exception', exception)
    .factory('httpInterceptor', httpInterceptor)
    .factory('noCacheInterceptor', noCacheInterceptor)

  logger.$inject = ['$log', 'toastr']
  exception.$inject = []
  httpInterceptor.$inject = ['$q', '$location']
  noCacheInterceptor.$inject = []
  /* @ngInject */
  function logger ($log, toastr) {
    var service = {
      showToasts: true,

      error: error,
      info: info,
      success: success,
      warning: warning,

      // straight to console; bypass toastr
      log: $log.log
    }

    return service
    // ///////////////////

    function error (message, data, title) {
      toastr.error(message, title)
      $log.error('Error: ' + message, data)
    }

    function info (message, data, title) {
      toastr.info(message, title)
      $log.info('Info: ' + message, data)
    }

    function success (message, data, title) {
      toastr.success(message, title)
      $log.info('Success: ' + message, data)
    }

    function warning (message, data, title) {
      toastr.warning(message, title)
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
        }
        e.data.description = newMessage
        logger.error(newMessage)
        return $q.reject(e)
      }
    }
  }

  /* @ngInject */
  function httpInterceptor ($q, $location) {
    return {
      // 'response': function (response) {
      //   if (response.status === 402) {
      //     $location.path('/login')
      //     return $q.reject(response)
      //   }
      //   return response || $q.when(response)
      // },

      // 'responseError': function (rejection) {
      //   if (rejection.status === 402) {
      //     $location.url('/login')
      //     return $q.reject(rejection)
      //   }
      //   return $q.reject(rejection)
      // }

    }
  }
  /* @ngInject */
  function noCacheInterceptor () {
    return {
      request: function (config) {
        // console.log(config.method)
        // var n = config.url.search(/template|modal|myModal|myCloseModal|myEmailModal/i)
        // // console.log("search", n + ":"+ config.url)
        // if (n == -1) {
        //   if (config.method == 'GET') {
        //     var separator = config.url.indexOf('?') === -1 ? '?' : '&'
        //     config.url = config.url + separator + 'noCache=' + new Date().getTime()
        //   }
        // // console.log(config.method)
        // // console.log(config.url)
        // } else {
        //   // console.log("console noCache")
        // }

        return config
      }
    }
  }
}())
