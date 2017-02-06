describe('BLOG Testing', function () {
  beforeEach(module('app'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      this.timeout(1000)
      states.list = $state.get('list')
      states.view = $state.get('view')
      states.create = $state.get('create')
      states.edit = $state.get('edit')
    }))

    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/blog/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/blog/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('BlogController')
      })
    })

    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/blog/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/blog/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('BlogController')
      })
    })

    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/blog/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/blog/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('BlogController')
      })
    })

    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/blog/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/blog/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('BlogController')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var BlogController
    var $location
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    // Random id for testing
    var blogId = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()
    var getMockBlogData = function () {
      return {
        _id: blogId,
        title: 'Nodejs',
        content: 'Try it out',
        created: timestamp
      }
    }

    beforeEach(inject(function (_$httpBackend_, _$stateParams_, _$location_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_
      $stateParams = _$stateParams_
      $location = _$location_
      $httpBackend.when('GET', /\/api\/user\/authenticate\?noCache=\d+/)
        .respond(200, authResponse)
      $httpBackend.when('GET', /\/api\/seo\/*/)
        .respond(200, {})
      $httpBackend.when('GET', /modules\/\w+\/(\d|\w)+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      var $scope = $rootScope.$new()
      BlogController = $controller('BlogController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(BlogController).to.exist
    })

    it('vm.list() should return an array of blog posts from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/blog\?noCache=\d+/).respond({
        blogs: [
          {
            title: 'Nodejs',
            content: 'Try it out',
            created: timestamp
          }, {
            title: 'Angularjs',
            content: 'v2 stable coming soon',
            created: timestamp
          }
        ],
        count: 2
      })

      BlogController.list()
      $httpBackend.flush()

      var sameBlogs = angular.equals(BlogController.blogs,
        [
          {
            title: 'Nodejs',
            content: 'Try it out',
            created: timestamp
          }, {
            title: 'Angularjs',
            content: 'v2 stable coming soon',
            created: timestamp
          }
        ]
      )

      expect(sameBlogs).to.equal(true)
    })

    it('vm.find() should return a blog post from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/blog\/[\w\d]+\?noCache=\d+/)
        .respond(getMockBlogData())

      // find() relies on id state param being present
      $stateParams.id = blogId
      BlogController.find()
      $httpBackend.flush()

      var sameBlog = angular.equals(BlogController.blog, getMockBlogData())

      expect(sameBlog).to.equal(true)
    })

    it('vm.create() should return a blog post from POST request and redirect to blog list', function () {
      $httpBackend.whenPOST(/api\/blog/)
        .respond(getMockBlogData())

      // Mimic form inputs
      BlogController.blog.title = getMockBlogData().title
      BlogController.blog.content = getMockBlogData().content

      BlogController.create(true)
      $httpBackend.flush()

      var sameBlog = angular.equals(BlogController.blog, getMockBlogData())

      expect(sameBlog).to.equal(true)
      expect($location.path()).to.equal('/blog/list')
    })

    it('vm.update() should return a blog post from PUT request and redirect to blog post view', function () {
      $httpBackend.whenPUT(/\/api\/blog\/[\w\d]+/)
        .respond({
          data: getMockBlogData()
        })

      BlogController.blog = getMockBlogData()

      // Mimic form inputs
      BlogController.blog.title = getMockBlogData().title
      BlogController.blog.content = getMockBlogData().content

      // update() relies on id state param being present
      $stateParams.id = blogId
      BlogController.update(true)
      $httpBackend.flush()

      var sameBlog = angular.equals(BlogController.blog, getMockBlogData())

      expect(sameBlog).to.equal(true)
      expect($location.path()).to.equal('/blog/view/' + BlogController.blog._id)
    })

    it('vm.delete() should send a DELETE request with a valid blog id and delete the blog from the vm', function () {
      $httpBackend.whenDELETE(/api\/blog\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize blog posts as in the blog list view
      BlogController.blogs = [getMockBlogData()]
      expect(BlogController.blogs.length).to.equal(1)

      BlogController.delete(BlogController.blogs[0]._id)
      $httpBackend.flush()

      expect(BlogController.blogs.length).to.equal(0)
    })
  })

  this.timeout(500)

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300)
  })

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 200)
  })
})
