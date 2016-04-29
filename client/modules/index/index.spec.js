describe('INDEX Testing', function () {
  beforeEach(module('app'))

  describe('route', function () {
    var indexState
    beforeEach(inject(function ($state) {
      indexState = $state.get('index')
    }))

    it('should have the correct url', function () {
      expect(indexState.url).to.equal('/')
    })

    it('should have the correct templateUrl', function () {
      expect(indexState.templateUrl).to.equal('modules/index/index.view.html')
    })

    it('should have the correct controller', function () {
      expect(indexState.controller).to.equal('IndexController')
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
