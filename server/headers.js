module.exports = headers

function headers (self) {
  self.app.use(function (req, res, next) {
    // Add all custom system headers here
    // Force IE to use latest rendering engine or Chrome Frame
    res.header('X-UA-Compatible', 'IE=Edge,chrome=1')
    next()
  })
}
