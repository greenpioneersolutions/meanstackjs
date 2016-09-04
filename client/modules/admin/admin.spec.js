describe('Generated Admin Testing', function () {
  beforeEach(module('app.admin'))
  beforeEach(module('app.core'))
  beforeEach(module('app.user'))

  describe('routes', function () {
    var states = {}
    beforeEach(inject(function ($state) {
      states.view = $state.get('adminDashboard')
    }))
    describe('view', function () {
      it('should have the correct url', function () {
        expect(states.view.url).to.equal('/admin?view')
      })

      it('should have the correct templateUrl', function () {
        expect(states.view.templateUrl).to.equal('modules/admin/view.view.html')
      })

      it('should have the correct controller', function () {
        expect(states.view.controller).to.equal('AdminController')
      })
    })
  })
})
