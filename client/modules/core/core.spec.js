describe('CORE Testing', function () {
  var $injector
  beforeEach(module('app.core'))
  beforeEach(inject(function (_$injector_) {
    $injector = _$injector_
  }))

  describe('MeanSockets factory', function () {
    var MeanSocket
    var connection
    beforeEach(inject(function (_MeanSocket_) {
      MeanSocket = _MeanSocket_
      connection = MeanSocket.connect()
    }))

    it('should connect when connect() is called and return a proper connection', function () {
      // connect() called in beforeEach
      expect(connection).to.exist
      expect(connection.io).to.exist
    })

    it('should disconnect when disconnect() is called and return a proper disconnection', function () {
      var disconnection = MeanSocket.disconnect()
      expect(disconnection).to.exist
      expect(disconnection.io).to.exist
    })
  })

  describe('route', function () {
    describe('404 route', function () {
      var state404
      beforeEach(inject(function ($state) {
        state404 = $state.get('404')
      }))

      it('should have the correct url', function () {
        expect(state404.url).to.equal('/404')
      })

      it('should have the correct templateUrl', function () {
        expect(state404.templateUrl).to.equal('modules/core/404.view.html')
      })
    })
  })

  describe('config, constants, and values', function () {
    it('should have a registered moment dependency', function () {
      var moment = $injector.get('moment')
      expect(moment).to.exist
    })

    it('should have a registered toastr dependency', function () {
      var toastr = $injector.get('toastr')
      expect(toastr).to.exist
    })

    it('should have a registered lodash dependency', function () {
      var _ = $injector.get('_')
      expect(_).to.exist
    })

    it('should have an app title', function () {
      var config = $injector.get('config')
      expect(config.appTitle).to.exist
    })

    it('should have an app error prefix', function () {
      var config = $injector.get('config')
      expect(config.appErrorPrefix).to.exist
    })

    it('should have toastr timeout configured', function () {
      var toastr = $injector.get('toastr')
      expect(toastr.options.timeOut).to.be.a('number')
    })

    it('should have toastr position class configured', function () {
      var toastr = $injector.get('toastr')
      expect(toastr.options.positionClass).to.be.a('string')
    })
  })

  describe('controller', function () {
    it('should exist', function () {
      inject(function ($rootScope, $controller) {
        var $scope = $rootScope.$new()
        var CoreController = $controller('CoreController', {$scope: $scope})
        expect(CoreController).to.exist
      })
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
