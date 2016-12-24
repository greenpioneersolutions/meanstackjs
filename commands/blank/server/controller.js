exports.get<%= Name %> = function (req, res, next) {
  return res.status(200).send('<%= name %>')
}

