module.exports = { send }

const sendmail = require('sendmail')()
const settings = require('../configs/settings.js').get()

function send (message, cb) {
  const mailOptions = {
    to: message.to,
    from: settings.email.from,
    subject: message.subject,
    html: message.html
  }

  sendmail(mailOptions, cb)
}
