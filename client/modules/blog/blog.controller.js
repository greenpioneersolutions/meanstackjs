;(function () {
  'use strict'

  angular
    .module('app.blog', [])
    .controller('BlogController', BlogController)

  BlogController.$inject = ['$http', '$stateParams', 'BlogFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function BlogController ($http, $stateParams, BlogFactory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'System'
    vm.blog = {}
    vm.UserFactory = UserFactory
    activate()

    vm.create = function () {
      var blog = new BlogFactory(vm.blog)
      blog.user = vm.UserFactory.user
      blog.$save(function (response) {
        vm.blog = response.data.data
        //  window.location.href
        $location.url('/blog/list')
      }, function (error) {
        logger.error(error)
      })
    }
    vm.find = function () {
      BlogFactory.get({
        id: $stateParams.id
      }, function (success) {
        vm.blog = success.data
      }, function (error) {
        logger.error(error)
      })
    }
    vm.list = function () {
      BlogFactory.get(function (success) {
        vm.blogs = success.data
      }, function (error) {
        logger.error(error)
      })
    }
    vm.update = function (isValid) {
      if (isValid) {
        BlogFactory.update({
          id: $stateParams.id
        }, vm.blog,
          function (success) {
            $location.url('/blog/view/' + $stateParams.id)
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    vm.delete = function (blogId) {
      var deleteConfirm = confirm('Are you sure you want to delete this blog?') // eslint-disable-line
      if (deleteConfirm === true) {
        BlogFactory.remove({
          id: blogId
        },
          function (success) {
            for (var i in vm.blogs) {
              if (vm.blogs[i]._id === blogId) {
                vm.blogs.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    function activate () {
      logger.info('Activated Blog View')
    }
  }
})()
