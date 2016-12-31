# Errors

## Where do we catch our errors ?

1. Run.js - uncaughtException

``` javascript
process.on('uncaughtException', function (logErr) {
   error.log(err,function(logErr){
      // We will tell the process to quick because its not recommend to continue on
      // we recommend pm2 or something that will restart your processes automatically
      process.exit(1)
   })
})
```

2. Run.js - unhandledRejection

``` javascript
// We do not quit on a unhandled reject because this is only going to work in later versions of node
// and we defer to how you uses promises to handle your errors here but we will still log them for you
process.on('unhandledRejection', function (reason) {
  debug('System Error unhandledRejection:' + reason)
  console.error('[UNHANDLED REJECTION]')
  console.error(error.log(reason))
})
```

3. server/error.js:middleware - express errors

This is not says if express breaks it more of it a error happens on expresses watch then it will defer to this function.

``` javascript
self.app.use(function (err, req, res, next) {
    // 1st pull out all relevant information out of err
    // 2nd check against any common validations with mongoose
    // 3rd start construction all information we can compile for you
    // 4th check if the status code is 500 and over then we log the error with our system
    // 5th check for production mode and if so then do not send back stack/text information
    // 6th send the info we can back to the sure
})
```

## How do we log our errors

`error.log()`

### server.error.js:log - system error log

We log every issue for you now in the database under the `error` collection. In doing that we wanted to give admins a place to view there data instead of just in a log(we still log out the error too). check out the [Dashboard](http://localhost:3000/admin?view=errors). We know that some errors will repeat so we check for the same message seeing as that is our main indicator of what happened. If we find the same one again we will update the count and add a timestamp to the history. With this in place you will now have the ability to add back in the logic we have commented out to allowing you to email yourself when you think its worth knowing about with your own rules on the data. Check it out and let us know your thoughts.