exports.testing = function (mail, settings) {
  return function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
}
