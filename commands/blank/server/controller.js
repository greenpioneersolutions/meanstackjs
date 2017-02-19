exports.get<%= Name %> = get<%= Name %>

function get<%= Name %>(req, res, next) {
  return res.status(200).send('<%= name %>')
}

