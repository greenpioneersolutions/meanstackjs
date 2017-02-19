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
    vm.create = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Create Blog Post Validation')
        return
      }
      var blog = new BlogFactory(vm.blog)
      blog.user = vm.UserFactory.user
      blog.$save(function (response) {
        vm.blog = response
        //  window.location.href
        $location.url('/blog/list')
      }, function (error) {
        logger.error(error.data.message, error, 'Blog')
      })
    }
    vm.find = function () {
      BlogFactory.get({
        id: $stateParams.id
      }, function (success) {
        vm.blog = success
      }, function (error) {
        logger.error(error.data.message, error, 'Blog')
      })
    }
    vm.list = function () {
      BlogFactory.get(function (success) {
        vm.blogs = success.blogs
        vm.count = success.count
      }, function (error) {
        logger.error(error.data.message, error, 'Blog')
      })
    }
    vm.update = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Edit Blog Post Validation')
        return
      }
      BlogFactory.update({
        id: $stateParams.id
      }, vm.blog,
        function (success) {
          $location.url('/blog/view/' + $stateParams.id)
        },
        function (error) {
          logger.error(error.data.message, error, 'Blog')
        })
    }
    vm.delete = function (blogId) {
      // Disable confirm for testing purposes
      var deleteConfirm = true
      // var deleteConfirm = confirm('Are you sure you want to delete this blog?') // eslint-disable-line
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
            logger.error(error.data.message, error, 'Blog')
          })
      }
    }
    function activate () {
      logger.info('Activated Blog View')
    }
  }
})()
