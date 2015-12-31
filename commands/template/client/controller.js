;(function () {
  'use strict'

  angular
    .module('app.__name__', [])
    .controller('__Name__Controller', __Name__Controller)

  __Name__Controller.$inject = ['$http', '$stateParams', '__Name__Factory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function __Name__Controller ($http, $stateParams, __Name__Factory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'System'
    vm.__name__ = {}
    vm.UserFactory = UserFactory
    activate()

    vm.create = function () {
      var __name__ = new __Name__Factory(vm.__name__)
      __name__.user = vm.UserFactory.user
      __name__.$save(function (response) {
        vm.__name__ = response.data.data
        //  window.location.href
        $location.url('/__name__/list')
      }, function (error) {
        logger.error(error)
      })
    }
    vm.find = function () {
      __Name__Factory.get({
        id: $stateParams.id
      }, function (success) {
        vm.__name__ = success.data
      }, function (error) {
        logger.error(error)
      })
    }
    vm.list = function () {
      __Name__Factory.get(function (success) {
        vm.__name__s = success.data
      }, function (error) {
        logger.error(error)
      })
    }
    vm.update = function (isValid) {
      if (isValid) {
        __Name__Factory.update({
          id: $stateParams.id
        }, vm.__name__,
          function (success) {
            $location.url('/__name__/view/' + $stateParams.id)
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    vm.delete = function (__name__Id) {
      var deleteConfirm = confirm('Are you sure you want to delete this __name__?') // eslint-disable-line
      if (deleteConfirm === true) {
        __Name__Factory.remove({
          id: __name__Id
        },
          function (success) {
            for (var i in vm.__name__s) {
              if (vm.__name__s[i]._id === __name__Id) {
                vm.__name__s.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    function activate () {
      logger.info('Activated __Name__ View')
    }
  }
})()
