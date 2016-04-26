module.exports = {
  tags: ['general'],
  'Localhost Check:page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .verify.visible('.container')
      .end()
  }
}
