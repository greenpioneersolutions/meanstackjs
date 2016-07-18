module.exports = {
  tags: ['general'],
  'Localhost Check:page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .verify.visible('.container')
      .end()
  },
  'Localhost Check:blog list': function (browser) {
    browser
      .url(browser.launch_url + '/blog/list')
      .waitForElementVisible('body', 1000)
      .assert.visible('.blog-title')
      .verify.visible('.container')
      .end()
  },
  'Localhost Check:404': function (browser) {
    browser
      .url(browser.launch_url + '404')
      .waitForElementVisible('body', 1000)
      .assert.title('404')
      .verify.visible('.container')
      .end()
  },
  'Localhost Check:500': function (browser) {
    browser
      .url(browser.launch_url + '500')
      .waitForElementVisible('body', 1000)
      .assert.title('500')
      .verify.visible('.container')
      .end()
  },
  'Localhost Check:signin': function (browser) {
    browser
      .url(browser.launch_url + 'signin')
      .waitForElementVisible('body', 1000)
      .assert.title('signin')
      .verify.visible('.container')
      .end()
  },
  'Localhost Check:signup': function (browser) {
    browser
      .url(browser.launch_url + 'signup')
      .waitForElementVisible('body', 1000)
      .assert.title('signup')
      .verify.visible('.container')
      .end()
  }
}
