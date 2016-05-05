describe('Generated __Name__ Testing', function () {
  beforeEach(module('app.__name__'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      states.list = $state.get('__name__List')
      states.view = $state.get('__name__View')
      states.create = $state.get('__name__Create')
      states.edit = $state.get('__name__Edit')
    }))

    describe('list', function () {
      it('should have the correct url', function () {
        expect(states.list.url).to.equal('/__name__/list')
      })

      it('should have the correct templateUrl', function () {
        expect(states.list.templateUrl).to.equal('modules/__name__/list.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.list.controller).to.equal('__Name__Controller')
      })
    })

    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/__name__/view/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/__name__/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('__Name__Controller')
      })
    })

    describe('create', function () {
      it('should have the correct url', function () {
        expect(states.create.url).to.equal('/__name__/create')
      })

      it('should have the correct templateUrl', function () {
        expect(states.create.templateUrl).to.equal('modules/__name__/create.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.create.controller).to.equal('__Name__Controller')
      })
    })

    describe('edit', function () {
      it('should have the correct url', function () {
        expect(states.edit.url).to.equal('/__name__/edit/:id')
      })

      it('should have the correct templateUrl', function () {
        expect(states.edit.templateUrl).to.equal('modules/__name__/edit.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.edit.controller).to.equal('__Name__Controller')
      })
    })
  })

  describe('controller', function () {
    var $httpBackend
    var $stateParams
    var $location
    var __Name__Controller
    var authResponse = {
      user: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlIjp7ImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IkludGVybmF0aW9uYWwiLCJ3ZWJzaXRlIjoiZ29vZ2xlLmNvbSIsInBpY3R1cmUiOiIiLCJuYW1lIjoiVGVzdCBVc2VyIn0sInJvbGVzIjpbXSwiZ3JhdmF0YXIiOiJodHRwczovL2dyYXZhdGFyLmNvbS9hdmF0YXIvZDViYjRmZmZmYTZhMzI0MjhjN2UzMTBjMzQxYjRmN2I_cz0yMDAmZD1yZXRybyIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsIl9pZCI6IjU3MTdhMmQ1MGI1ZTQ0YWE1ZTU0NjQ4YiIsImlhdCI6MTQ2MTE2NzQ5NSwiZXhwIjoxNDYxMTc0Njk1fQ.tsAiRGB-lUhnD70XXtliNsTzQj3gKLA0a28yTJWoo8c'
    }
    var __name__Id = '571a6803389f702a5c16dfa1'
    var timestamp = new Date()
    var getMock__Name__Data = function () {
      return {
        _id: __name__Id,
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
      __Name__Controller = $controller('__Name__Controller', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(__Name__Controller).to.exist
    })

    it('vm.list() should return an array of __name__s from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/__Name__\?noCache=\d+/).respond({
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

      __Name__Controller.list()
      $httpBackend.flush()

      var same__Name__s = angular.equals(__Name__Controller.__name__s,
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

      expect(same__Name__s).to.equal(true)
    })

    it('vm.find() should return a __name__ from GET request and store it in vm', function () {
      $httpBackend.whenGET(/\/api\/v1\/__Name__\/[\w\d]+\?noCache=\d+/)
        .respond({data: getMock__Name__Data()})

      // find() relies on id state param being present
      $stateParams.id = __name__Id
      __Name__Controller.find()
      $httpBackend.flush()

      var same__Name__ = angular.equals(__Name__Controller.__name__, getMock__Name__Data())

      expect(same__Name__).to.equal(true)
    })

    it('vm.create() should return a __name__ from POST request and redirect to __name__ list', function () {
      $httpBackend.whenPOST(/api\/v1\/__Name__/)
        .respond({
          data: {
            data: getMock__Name__Data()
          }
        })

      // Mimic form inputs
      __Name__Controller.__name__.title = getMock__Name__Data().title
      __Name__Controller.__name__.content = getMock__Name__Data().content

      __Name__Controller.create(true)
      $httpBackend.flush()

      var same__Name__ = angular.equals(__Name__Controller.__name__, getMock__Name__Data())

      expect(same__Name__).to.equal(true)
      expect($location.path()).to.equal('/__name__/list')
    })

    it('vm.update() should return a __name__ from PUT request and redirect to __name__ view', function () {
      $httpBackend.whenPUT(/\/api\/v1\/__Name__\/[\w\d]+/)
        .respond({
          data: getMock__Name__Data()
        })

      __Name__Controller.__name__ = getMock__Name__Data()

      // Mimic form inputs
      __Name__Controller.__name__.title = getMock__Name__Data().title
      __Name__Controller.__name__.content = getMock__Name__Data().content

      // update() relies on id state param being present
      $stateParams.id = __name__Id
      __Name__Controller.update(true)
      $httpBackend.flush()

      var same__Name__ = angular.equals(__Name__Controller.__name__, getMock__Name__Data())

      expect(same__Name__).to.equal(true)
      expect($location.path()).to.equal('/__name__/view/' + __Name__Controller.__name__._id)
    })

    it('vm.delete() should send a DELETE request with a valid __name__ id and delete the __name__ from the view model', function () {
      $httpBackend.whenDELETE(/api\/v1\/__Name__\/([0-9a-fA-F]{24})$/)
        .respond(204)

      // Initialize __name__ posts as in the __name__ list view
      __Name__Controller.__name__s = [getMock__Name__Data()]
      expect(__Name__Controller.__name__s.length).to.equal(1)

      __Name__Controller.delete(__Name__Controller.__name__s[0]._id)
      $httpBackend.flush()

      expect(__Name__Controller.__name__s.length).to.equal(0)
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
