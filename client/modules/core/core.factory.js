;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('MeanSocket', MeanSocket)

  MeanSocket.$inject = ['$rootScope', '$http']

  function MeanSocket ($rootScope, $http) {
    var socket = io.connect(window.location.hostname + ':8282/')
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments
          $rootScope.$apply(function () {
            callback.apply(socket, args)
          })
        })
      },
      once: function (eventName, callback) {
        socket.once(eventName, function () {
          var args = arguments
          $rootScope.$apply(function () {
            callback.apply(socket, args)
          })
        })
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          $rootScope.$apply(function () {
            var args = arguments
            if (callback) {
              callback.apply(socket, args)
            }
          })
        })
      },
      removeAllListeners: function () {
        return socket.removeAllListeners.apply(socket, arguments)
      },
      disconnect: function (close) {
        return socket.disconnect(close)
      },
      connect: function () {
        return socket.connect()
      }
    }
  }
}())
