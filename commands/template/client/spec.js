describe('Generated <%= Name %> Testing', function () {
  beforeEach(module('app.<%= name %>'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      states.list = $state.get('<%= name %>List')
      states.view = $state.get('<%= name %>View')
      states.create = $state.get('<%= name %>Create')
      states.edit = $state.get('<%= name %>Edit')
    }))

    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/<%= name %>/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/<%= name %>/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('<%= Name %>Controller')
      })
    })

    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/<%= name %>/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/<%= name %>/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('<%= Name %>Controller')
      })
    })

    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/<%= name %>/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/<%= name %>/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('<%= Name %>Controller')
      })
    })

    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/<%= name %>/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/<%= name %>/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('<%= Name %>Controller')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var $location
    var <%= Name %>Controller
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var <%= name %>Id = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()
    var getMock<%= Name %>Data = function () {
      return {
        _id: <%= name %>Id,
        title: 'Nodejs',
        content: 'Try it out',
        created: timestamp
      }
    }

    beforeEach(inject(function (_$httpBackend_, _$stateParams_, _$location_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_
      $stateParams = _$stateParams_
      $location = _$location_
      $httpBackend.when('GET', /\/api\/authenticate\?noCache=\d+/)
        .respond(200, authResponse)
      $httpBackend.when('GET', /modules\/\w+\/(\d|\w)+\.view\.html\?noCache=\d+/)
        .respond(200, '')
      var $scope = $rootScope.$new()
      <%= Name %>Controller = $controller('<%= Name %>Controller', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(<%= Name %>Controller).to.exist
    })

    it('vm.list() should return an array of <%= name %>s from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/<%= Name %>\?noCache=\d+/).respond({
        data: [
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
      })

      <%= Name %>Controller.list()
      $httpBackend.flush()

      var same<%= Name %>s = angular.equals(<%= Name %>Controller.<%= name %>s,
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

      expect(same<%= Name %>s).to.equal(true)
    })

    it('vm.find() should return a <%= name %> from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/<%= Name %>\/[\w\d]+\?noCache=\d+/)
        .respond({data: getMock<%= Name %>Data()})

      // find() relies on id state param being present
      $stateParams.id = <%= name %>Id
      <%= Name %>Controller.find()
      $httpBackend.flush()

      var same<%= Name %> = angular.equals(<%= Name %>Controller.<%= name %>, getMock<%= Name %>Data())

      expect(same<%= Name %>).to.equal(true)
    })

    it('vm.create() should return a <%= name %> from POST request and redirect to <%= name %> list', function () {
      $httpBackend.whenPOST(/api\/v1\/<%= Name %>/)
        .respond({
          data: {
            data: getMock<%= Name %>Data()
          }
        })

      // Mimic form inputs
      <%= Name %>Controller.<%= name %>.title = getMock<%= Name %>Data().title
      <%= Name %>Controller.<%= name %>.content = getMock<%= Name %>Data().content

      <%= Name %>Controller.create(true)
      $httpBackend.flush()

      var same<%= Name %> = angular.equals(<%= Name %>Controller.<%= name %>, getMock<%= Name %>Data())

      expect(same<%= Name %>).to.equal(true)
      expect($location.path()).to.equal('/<%= name %>/list')
    })

    it('vm.update() should return a <%= name %> from PUT request and redirect to <%= name %> view', function () {
      $httpBackend.whenPUT(/\/api\/v1\/<%= Name %>\/[\w\d]+/)
        .respond({
          data: getMock<%= Name %>Data()
        })

      <%= Name %>Controller.<%= name %> = getMock<%= Name %>Data()

      // Mimic form inputs
      <%= Name %>Controller.<%= name %>.title = getMock<%= Name %>Data().title
      <%= Name %>Controller.<%= name %>.content = getMock<%= Name %>Data().content

      // update() relies on id state param being present
      $stateParams.id = <%= name %>Id
      <%= Name %>Controller.update(true)
      $httpBackend.flush()

      var same<%= Name %> = angular.equals(<%= Name %>Controller.<%= name %>, getMock<%= Name %>Data())

      expect(same<%= Name %>).to.equal(true)
      expect($location.path()).to.equal('/<%= name %>/view/' + <%= Name %>Controller.<%= name %>._id)
    })

    it('vm.delete() should send a DELETE request with a valid <%= name %> id and delete the <%= name %> from the view model', function () {
      $httpBackend.whenDELETE(/api\/v1\/<%= Name %>\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize <%= name %> posts as in the <%= name %> list view
      <%= Name %>Controller.<%= name %>s = [getMock<%= Name %>Data()]
      expect(<%= Name %>Controller.<%= name %>s.length).to.equal(1)

      <%= Name %>Controller.delete(<%= Name %>Controller.<%= name %>s[0]._id)
      $httpBackend.flush()

      expect(<%= Name %>Controller.<%= name %>s.length).to.equal(0)
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
