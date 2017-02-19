exports.send = send

var nodemailer = require('nodemailer')
var settings = require('../configs/settings.js').get()
var debug = require('debug')('meanstackjs:mail')
var transporter = nodemailer.createTransport(settings.email.connect)

function send (message, cb) {
  var mailOptions = {
    to: message.to,
    from: settings.email.from,
    subject: message.subject,
    text: message.text
  }

  debug('mailOptions', mailOptions)
  transporter.sendMail(mailOptions, function (error) {
    if (error) debug('mail error:', error)
    cb(error)
  })
}
