const a11y = require('a11y')

const options = {
    // viewportSize: '800x600',
    // delay:5,
  verbose: true
}

a11y('http://localhost:3000/', options, (err, reports) => {
  if (err)console.log(err)
  console.log(reports)
})
