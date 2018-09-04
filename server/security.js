module.exports = { security }

const cors = require('cors')
const helmet = require('helmet')

function security (self) {
  self.app.use(helmet())
  self.app.use(cors())
  self.app.options('*', cors())
}
