var nodemailer = require('nodemailer')
var settings = require('../configs/settings.js')
var secrets = {
  host: 'smtp.mandrillapp.com', // Gmail, SMTP
  port: '587',
  auth: {
    user: 'hackathonstarterdemo',
    pass: 'E1K950_ydLR4mHw12a0ldA'
  }
}

var transporter = nodemailer.createTransport({
  host: secrets.host, // Gmail, SMTP
  port: secrets.port,
  auth: {
    user: secrets.auth.user,
    pass: secrets.auth.pass
  }
})

exports.send = function (message, cb) {
  var mailOptions = {
    to: message.to,
    from: settings.email.from,
    subject: message.subject,
    text: message.text
  }
  transporter.sendMail(mailOptions, function (err) {
    cb(err)
  })
}
