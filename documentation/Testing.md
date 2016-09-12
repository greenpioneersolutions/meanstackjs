## Testing

### NPM Test / Everything

```bash
# Make sure you haves a selenium sever on 
# https://www.npmjs.com/package/selenium-standalone
npm test
```

### Nightwatch / E2E

``` bash
npm install -g nightwatch
nightwatch
# or
npm run e2e
```

### Karma / Frontend

``` bash
npm install -g karma
karma start tests/unit/karma.test.js
# or
npm run karma
```

### Mocha & Chai / Backend

``` bash
npm install -g mocha
mocha tests/unit/mocha.test.js
# or
npm run mocha
```

### Standard / JS Style

``` bash
npm install -g standard
standard
# or
npm run standard
```