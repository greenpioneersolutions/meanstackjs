exports.testing = function (req, res) {
  return res.status(200).send({
    query: req.queryParameters
  })
}
