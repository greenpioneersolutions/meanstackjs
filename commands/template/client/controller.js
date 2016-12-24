;(function () {
  'use strict'

  angular
    .module('app.<%= name %>', [])
    .controller('<%= Name %>Controller', <%= Name %>Controller)

  <%= Name %>Controller.$inject = ['$http', '$stateParams', '<%= Name %>Factory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function <%= Name %>Controller ($http, $stateParams, <%= Name %>Factory, logger, $location, UserFactory) {
    var vm = this
    vm.title = '<%= name %>'
    vm.<%= name %> = {}
    vm.UserFactory = UserFactory
    activate()

    vm.create = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Create <%= Name %> Validation')
        return
      }
      var <%= name %> = new <%= Name %>Factory(vm.<%= name %>)
      <%= name %>.user = vm.UserFactory.user
      <%= name %>.$save(function (response) {
        vm.<%= name %> = response
        //  window.location.href
        $location.url('/<%= name %>/list')
      }, function (error) {
        logger.error(error)
      })
    }
    vm.find = function () {
      <%= Name %>Factory.get({
        id: $stateParams.id
      }, function (success) {
        vm.<%= name %> = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.list = function () {
      <%= Name %>Factory.query(function (success) {
        vm.<%= name %>s = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.update = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Edit <%= Name %> Post Validation')
        return
      }
      <%= Name %>Factory.update({
        id: $stateParams.id
      }, vm.<%= name %>,
        function (success) {
          $location.url('/<%= name %>/view/' + $stateParams.id)
        },
        function (error) {
          logger.error(error)
        })
    }
    vm.delete = function (<%= name %>Id) {
      // Confirm disabled for testing purposes
      var deleteConfirm = true
      // var deleteConfirm = confirm('Are you sure you want to delete this <%= name %>?') // eslint-disable-line
      if (deleteConfirm === true) {
        <%= Name %>Factory.remove({
          id: <%= name %>Id
        },
          function (success) {
            for (var i in vm.<%= name %>s) {
              if (vm.<%= name %>s[i]._id === <%= name %>Id) {
                vm.<%= name %>s.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    function activate () {
      logger.info('Activated <%= Name %> View')
    }
  }
})()
