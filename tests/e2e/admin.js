module.exports = {
  // tags: ['admin'],
  // 'Localhost Check:login check admin as admin': function (browser) {
  //   browser
  //     .url(browser.launch_url + 'signin')
  //     .waitForElementVisible('body', 3000)
  //     .verify.visible('#email')
  //     .verify.visible('#password')
  //     .setValue('input[type=email]', 'jason@greenpioneersolutions.com')
  //     .setValue('input[type=password]', 'truetrue1!')
  //     .waitForElementVisible('button[type=submit]', 3000)
  //     .pause(2000)
  //     .click('button[type=submit]')
  //     .pause(1000)
  //     .click('#simple-dropdown')
  //     .pause(1000)
  //     .verify.visible('#admin')
  //     .click('#admin')
  //     .pause(2000)
  //     .click('#Users')
  //     .pause(16000)
  //     .assert.containsText('body', 'jason@greenpioneersolutions.com')
  //     .end()
  // },
  // 'Localhost Check:login check admin as user': function (browser) {
  //   browser
  //     .url(browser.launch_url + 'signin')
  //     .waitForElementVisible('body', 3000)
  //     .verify.visible('#email')
  //     .verify.visible('#password')
  //     .setValue('input[type=email]', 'accounting@greenpioneersolutions.com')
  //     .setValue('input[type=password]', 'truetrue1!')
  //     .waitForElementVisible('button[type=submit]', 3000)
  //     .pause(2000)
  //     .click('button[type=submit]')
  //     .pause(1000)
  //     .click('#simple-dropdown')
  //     .pause(1000)
  //     .verify.hidden('#admin')
  //     .end()
  // },
  // 'Localhost Check:login check admin page - not authorized': function (browser) {
  //   browser
  //     .url(browser.launch_url + 'signin')
  //     .waitForElementVisible('body', 3000)
  //     .url(browser.launch_url + '/admin')
  //     .pause(2000)
  //     .waitForElementVisible('#toast-container', 2000)
  //     .end()
  // }
}
