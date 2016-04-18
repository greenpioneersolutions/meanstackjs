module.exports = {
  'Localhost Check:login': function (browser) {
    console.log(browser.launch_url + 'signin/')
    browser
      .url(browser.launch_url + 'signin/')
      .waitForElementVisible('body', 1000)
      .verify.visible('#email')
      .verify.visible('#password')
      .verify.value('input[type=email]', '')
      .verify.elementNotPresent('.error')
  }
  // ,

  // 'Try to login with no username or password': function (browser) {
  //   browser
  //     .click('button[type=submit]')
  //     .pause(1000)
  //     .verify.visible('.error')
  //     .verify.containsText('.error', 'Username and Password is empty')
  //     .verify.valueContains('#email', '')
  //     .verify.valueContains('#password', '')
  // }

  // 'Try to login with a username and no password': function (browser) {
  //   browser
  //     .setValue('#email', 'abc')
  //     .click('input[type=submit]')
  //     .pause(1000)
  //     .verify.visible('.error')
  //     .verify.containsText('.error', 'Password is empty')
  //     .verify.valueContains('#email', '')
  //     .verify.valueContains('#password', '')
  // },

  // 'Try to login with a password and no username': function (browser) {
  //   browser
  //     .setValue('#password', 'test')
  //     .click('input[type=submit]')
  //     .pause(1000)
  //     .verify.visible('.error')
  //     .verify.containsText('.error', 'Username is empty')
  //     .verify.valueContains('#email', '')
  //     .verify.valueContains('#password', '')
  // },

  // 'Enter wrong username and password': function (browser) {
  //   browser
  //     .setValue('#email', 'abc')
  //     .setValue('#password', '123')
  //     .click('input[type=submit]')
  //     .pause(1000)
  //     .verify.visible('.error')
  //     .verify.containsText('.error', 'Invalid Username and/or Password')
  //     .verify.valueContains('#email', '')
  //     .verify.valueContains('#password', '')
  //     .end()
  // }

}
