describe('FOOTER Testing', function () {
  describe('controller', function () {
    var FooterController
    beforeEach(module('app.footer'))
    beforeEach(inject(function ($controller, $rootScope) {
      var $scope = $rootScope.$new()
      FooterController = $controller('FooterController', {$scope: $scope})
    }))

    it('should exist', function () {
      expect(FooterController).to.exist
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
