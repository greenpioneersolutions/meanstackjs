module.exports = {
  'Example test Google': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .end()
  },
  'Localhost Check:page': function (browser) {
    console.log(browser.launch_url)
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .verify.visible('.container')
      .end()
  }
}
