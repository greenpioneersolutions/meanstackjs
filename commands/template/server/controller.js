exports.__name__ = function (mail, settings) {
  return function (req, res) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
}
