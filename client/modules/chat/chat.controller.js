;(function () {
  'use strict'

  angular
    .module('app.chat', [])
    .controller('ChatController', ChatController)

  ChatController.$inject = ['$http', '$stateParams', 'logger', '$location', 'UserFactory', 'MeanSocket']
  /* @ngInject */
  function ChatController ($http, $stateParams, logger, $location, UserFactory, MeanSocket) {
    var vm = this
    vm.title = 'chat'
    vm.chat = {}
    vm.UserFactory = UserFactory
    activate()

    vm.messages = []
    MeanSocket.on('message', function (msg) {
      var message = _.clone(msg)
      message.date = Date.now()
      vm.messages.unshift(message)
    })
    vm.chat = function () {
      if (!vm.message) return
      MeanSocket.emit('message', {
        message: vm.message,
        user: vm.UserFactory.user.profile.name || 'Unknown'
      })
      vm.message = ''
    }

    function activate () {
      logger.info('Activated Chat View')
    }
  }
})()
