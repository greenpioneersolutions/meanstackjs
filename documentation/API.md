## API 


<details><summary>/api/admin/users - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsers(req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password -apikey')
    .exec(function (error, users) {
      if (error) return next(error)
      debug('end getUsers')
      return res.send(users)
    })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - GET</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsersById(req, res, next) {
  res.send(req.adminUser)
}
```

</p>
</details>

<details><summary>/api/admin/users - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postUsers(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Users.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - PUT</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putUsers(req, res, next) {
  req.adminUser = _.assign(req.adminUser, req.body)
  req.adminUser.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.adminUser)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - DELETE</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteUsers(req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrors(req, res, next) {
  auto({
    errors: function (cb) {
      Errors
        .find()
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .select('-password')
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.errors)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - GET</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrorsById(req, res, next) {
  res.send(req.error)
}
```

</p>
</details>

<details><summary>/api/admin/errors - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postErrors(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - PUT</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putErrors(req, res, next) {
  req.error = _.assign(req.error, req.body)
  req.error.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.error)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - DELETE</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteErrors(req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/logs/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function (req, res, next) {
    logger.query({
      from: req.query.from || (new Date() - 24 * 60 * 60 * 1000),
      until: req.query.until || new Date(),
      limit: req.query.limit || 10,
      start: req.query.start || 0,
      order: req.query.order || 'desc',
      fields: req.query.fields || undefined
    }, function (error, results) {
      if (error) return next(error)
      if (req.query.select) return res.status(200).send(results[req.query.select])
      return res.status(200).send(results)
    })
  }
```

</p>
</details>

<details><summary>/api/blog/ - GET</summary>
<p>

#### Description 
  Blog operations







#### Code

```javascript
function getBlog(req, res, next) {
  debug('start getBlog')
  auto({
    blogs: function (cb) {
      debug(req.queryParameters)
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .select(req.queryParameters.select || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .count()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    debug('end getBlog')
    return res.status(200).send(results)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - GET</summary>
<p>



#### Params 
* blogId - **Required** 





#### Code

```javascript
function getBlogById(req, res, next) {
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}
```

</p>
</details>

<details><summary>/api/blog - POST</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function postBlog(req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  blogs.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - PUT</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function putBlog(req, res, next) {
  req.blog = _.assign(req.blog, req.body)
  req.blog.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.blog)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - DELETE</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function deleteBlog(req, res, next) {
  req.blog.remove(function (error) {
    if (error) return next(error)
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/testing/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
```

</p>
</details>

<details><summary>/api/settings/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.send(require('pug').renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
```

</p>
</details>

<details><summary>/api/system/status - GET</summary>
<p>








#### Code

```javascript
function status(req, res, next) {
  res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/photos/upload - POST</summary>
<p>





#### Middleware

<details><summary>multerMiddleware</summary>
<p>

```javascript
function multerMiddleware(req, res, next) {
    if (!is(req, ['multipart'])) return next()

    var options = setup()

    var limits = options.limits
    var storage = options.storage
    var fileFilter = options.fileFilter
    var fileStrategy = options.fileStrategy
    var preservePath = options.preservePath

    req.body = Object.create(null)

    var busboy

    try {
      busboy = new Busboy({ headers: req.headers, limits: limits, preservePath: preservePath })
    } catch (err) {
      return next(err)
    }

    var appender = new FileAppender(fileStrategy, req)
    var isDone = false
    var readFinished = false
    var errorOccured = false
    var pendingWrites = new Counter()
    var uploadedFiles = []

    function done (err) {
      if (isDone) return
      isDone = true

      req.unpipe(busboy)
      drainStream(req)
      busboy.removeAllListeners()

      onFinished(req, function () { next(err) })
    }

    function indicateDone () {
      if (readFinished && pendingWrites.isZero() && !errorOccured) done()
    }

    function abortWithError (uploadError) {
      if (errorOccured) return
      errorOccured = true

      pendingWrites.onceZero(function () {
        function remove (file, cb) {
          storage._removeFile(req, file, cb)
        }

        removeUploadedFiles(uploadedFiles, remove, function (err, storageErrors) {
          if (err) return done(err)

          uploadError.storageErrors = storageErrors
          done(uploadError)
        })
      })
    }

    function abortWithCode (code, optionalField) {
      abortWithError(makeError(code, optionalField))
    }

    // handle text field data
    busboy.on('field', function (fieldname, value, fieldnameTruncated, valueTruncated) {
      if (fieldnameTruncated) return abortWithCode('LIMIT_FIELD_KEY')
      if (valueTruncated) return abortWithCode('LIMIT_FIELD_VALUE', fieldname)

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      appendField(req.body, fieldname, value)
    })

    // handle files
    busboy.on('file', function (fieldname, fileStream, filename, encoding, mimetype) {
      // don't attach to the files object, if there is no file
      if (!filename) return fileStream.resume()

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      var file = {
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimetype
      }

      var placeholder = appender.insertPlaceholder(file)

      fileFilter(req, file, function (err, includeFile) {
        if (err) {
          appender.removePlaceholder(placeholder)
          return abortWithError(err)
        }

        if (!includeFile) {
          appender.removePlaceholder(placeholder)
          return fileStream.resume()
        }

        var aborting = false
        pendingWrites.increment()

        Object.defineProperty(file, 'stream', {
          configurable: true,
          enumerable: false,
          value: fileStream
        })

        fileStream.on('error', function (err) {
          pendingWrites.decrement()
          abortWithError(err)
        })

        fileStream.on('limit', function () {
          aborting = true
          abortWithCode('LIMIT_FILE_SIZE', fieldname)
        })

        storage._handleFile(req, file, function (err, info) {
          if (aborting) {
            appender.removePlaceholder(placeholder)
            uploadedFiles.push(extend(file, info))
            return pendingWrites.decrement()
          }

          if (err) {
            appender.removePlaceholder(placeholder)
            pendingWrites.decrement()
            return abortWithError(err)
          }

          var fileInfo = extend(file, info)

          appender.replacePlaceholder(placeholder, fileInfo)
          uploadedFiles.push(fileInfo)
          pendingWrites.decrement()
          indicateDone()
        })
      })
    })

    busboy.on('error', function (err) { abortWithError(err) })
    busboy.on('partsLimit', function () { abortWithCode('LIMIT_PART_COUNT') })
    busboy.on('filesLimit', function () { abortWithCode('LIMIT_FILE_COUNT') })
    busboy.on('fieldsLimit', function () { abortWithCode('LIMIT_FIELD_COUNT') })
    busboy.on('finish', function () {
      readFinished = true
      indicateDone()
    })

    req.pipe(busboy)
  }
```

</p>
</details>



#### Code

```javascript
function postPhoto(req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        debug('end postPhoto')
        return res.status(400).send(error)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (error) {
        if (error) {
          debug('end postPhoto')
          return res.status(400).send(error)
        } else {
          debug('end postPhoto')
          return res.status(201).send()
        }
      })
    })
  } else {
    debug('end postPhoto')
    return res.status(400).send()
  }
}
```

</p>
</details>

<details><summary>/api/user/authenticate - POST</summary>
<p>

#### Description 
  Authentication route




#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postAuthenticate(req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}
```

</p>
</details>

<details><summary>/api/user/authenticate - GET</summary>
<p>

#### Description 
  Check Authentication
#### Method 
  get







#### Code

```javascript
function getAuthenticate(req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (error, user) {
      if (error) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}
```

</p>
</details>

<details><summary>/api/user/logout - POST</summary>
<p>








#### Code

```javascript
function logout(req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/forgot - POST</summary>
<p>








#### Code

```javascript
function postForgot(req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (error, buf) {
        var token = buf.toString('hex')
        done(error, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (error, user) {
        if (error) {
          debug('end postForgot')
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (error) {
          callback(error, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (error) {
        callback(error, true)
      })
    }]
  }, function (error) {
    if (error) {
      return next(error)
    }
    debug('end postForgot')
    return res.status(200).send({ message: 'Email has been sent' })
  })
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - GET</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function getReset(req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      message: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (error, user) {
        if (error) {
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          message: 'token is valid',
          valid: true
        })
      })
  }
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - POST</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function postReset(req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({message: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (error, user) {
            if (error) {
              return next(error)
            }
            if (!user) {
              return res.status(400).send({message: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (error) {
              if (error) {
                return next(error)
              }
              req.logIn(user, function (error) {
                callback(error, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (error) {
          callback(error, true)
        })
      }]
    }, function (error, user) {
      if (error) {
        return next(error)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}
```

</p>
</details>

<details><summary>/api/user/signup - POST</summary>
<p>








#### Code

```javascript
function postSignup(req, res, next) {
  debug('start postSignup')

  req.assert('profile', 'Name must not be empty').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  var redirect = req.body.redirect || false
  if (errors) {
    debug('end postSignup')
    return res.status(400).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signup'
    })
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.profile.name
    }
  })

  User.findOne({ email: req.body.email }, function (error, existingUser) {
    if (error) {
      return res.status(400).send(error)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ message: 'Account with that email address already exists.' })
    }
    user.save(function (error) {
      if (error && error.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ message: 'Account with that email address already exists.' })
      } else if (error && error.name === 'ValidationError') {
        var keys = _.keys(error.errors)
        debug('end postSignup')
        return res.status(400).send({ message: error.errors[keys[0]].message }) // error.message
      } else if (error) {
        next(error)
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error)
          } else {
            delete user['password']
            var token = tokenApi.createKey(user)
            res.cookie('token', token)
            debug('end postSignup')
            return res.status(200).send(exports.createResponseObject(user, token, redirect))
          }
        })
      }
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/profile - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdateProfile(req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user = _.assign(user, req.body)
    user.save(function (error) {
      if (error) {
        return next(error)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/password - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdatePassword(req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user.password = req.body.password
    user.save(function (error) {
      if (error) {
        return next(error)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/delete - DELETE</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteDeleteAccount(req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (error) {
    if (error) {
      return next(error)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}
```

</p>
</details>

<details><summary>/api/user/token - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKey(req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}
```

</p>
</details>

<details><summary>/api/user/token - POST</summary>
<p>





#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postKey(req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}
```

</p>
</details>

<details><summary>/api/user/token/reset - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKeyReset(req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (error) {
    debug('start getKeyReset')
    if (error) return res.status(500).send(error)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}
```

</p>
</details>

<details><summary>/api/admin/users - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsers(req, res, next) {
  debug('start getUsers')
  Users
    .find(req.queryParameters.filter || '')
    .where(req.queryParameters.where || '')
    .sort(req.queryParameters.sort || '')
    .limit(req.queryParameters.limit || '')
    .skip(req.queryParameters.skip || '')
    .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
    .select('-password -apikey')
    .exec(function (error, users) {
      if (error) return next(error)
      debug('end getUsers')
      return res.send(users)
    })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - GET</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getUsersById(req, res, next) {
  res.send(req.adminUser)
}
```

</p>
</details>

<details><summary>/api/admin/users - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postUsers(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Users.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - PUT</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putUsers(req, res, next) {
  req.adminUser = _.assign(req.adminUser, req.body)
  req.adminUser.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.adminUser)
  })
}
```

</p>
</details>

<details><summary>/api/admin/users/:userId - DELETE</summary>
<p>



#### Params 
* userId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteUsers(req, res, next) {
  req.adminUser.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrors(req, res, next) {
  auto({
    errors: function (cb) {
      Errors
        .find()
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .select('-password')
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    return res.status(200).send(results.errors)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - GET</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function getErrorsById(req, res, next) {
  res.send(req.error)
}
```

</p>
</details>

<details><summary>/api/admin/errors - POST</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function postErrors(req, res, next) {
  // req.assert('name', 'The name cannot be blank').notEmpty()

  var errors = req.validationErrors()
  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }
  Errors.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - PUT</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function putErrors(req, res, next) {
  req.error = _.assign(req.error, req.body)
  req.error.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.error)
  })
}
```

</p>
</details>

<details><summary>/api/admin/errors/:errorId - DELETE</summary>
<p>



#### Params 
* errorId - **Required** 


#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteErrors(req, res, next) {
  req.error.remove(function () {
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/admin/logs/ - GET</summary>
<p>





#### Middleware

<details><summary>isAdmin</summary>
<p>

```javascript
function isAdmin(req, res, next) {
  debug('middleware: isAdmin')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    if (req.user) {
      if (_.includes(req.user.roles, 'admin')) {
        return next()
      }
    }
    return res.status(401).send('User is not authorized')
  })
}
```

</p>
</details>



#### Code

```javascript
function (req, res, next) {
    logger.query({
      from: req.query.from || (new Date() - 24 * 60 * 60 * 1000),
      until: req.query.until || new Date(),
      limit: req.query.limit || 10,
      start: req.query.start || 0,
      order: req.query.order || 'desc',
      fields: req.query.fields || undefined
    }, function (error, results) {
      if (error) return next(error)
      if (req.query.select) return res.status(200).send(results[req.query.select])
      return res.status(200).send(results)
    })
  }
```

</p>
</details>

<details><summary>/api/blog/ - GET</summary>
<p>

#### Description 
  Blog operations







#### Code

```javascript
function getBlog(req, res, next) {
  debug('start getBlog')
  auto({
    blogs: function (cb) {
      debug(req.queryParameters)
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .sort(req.queryParameters.sort || '')
        .select(req.queryParameters.select || '')
        .limit(req.queryParameters.limit || '')
        .skip(req.queryParameters.skip || '')
        .populate(req.queryParameters.populateId || 'user', req.queryParameters.populateItems || '')
        .exec(cb)
    },
    count: function (cb) {
      blogs
        .find(req.queryParameters.filter || '')
        .where(req.queryParameters.where || '')
        .count()
        .exec(cb)
    }
  }, function (error, results) {
    if (error) return next(error)
    debug('end getBlog')
    return res.status(200).send(results)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - GET</summary>
<p>



#### Params 
* blogId - **Required** 





#### Code

```javascript
function getBlogById(req, res, next) {
  debug('start getBlogById')
  res.send(req.blog)
  debug('end getBlogById')
}
```

</p>
</details>

<details><summary>/api/blog - POST</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function postBlog(req, res, next) {
  // EX. of how to use express validator
  // req.assert('name', 'The name cannot be blank').notEmpty()
  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({
      success: false,
      message: errors[0].message,
      redirect: '/'
    })
  }

  req.body.user = req.user._id
  blogs.create(req.body, function (error, data) {
    if (error) return next(error)
    return res.status(201).send(data)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - PUT</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function putBlog(req, res, next) {
  req.blog = _.assign(req.blog, req.body)
  req.blog.save(function (error) {
    if (error) return next(error)
    return res.status(200).send(req.blog)
  })
}
```

</p>
</details>

<details><summary>/api/blog/:blogId - DELETE</summary>
<p>



#### Params 
* blogId - **Required** 


#### Middleware

<details><summary><anonymous></summary>
<p>

```javascript
function (req, res, next) {
    debug('middleware: isAuthorized')
    checkAuthenticated(req, function (error) {
      if (error) return res.status(401).send(error)
      var user
      var reqName = req[name]
      if (extra) {
        var reqExtra = reqName[extra]
        reqExtra && reqExtra.user && (user = reqExtra.user)
      } else {
        user = reqName.user
      }
      if (req.user) {
        if (user._id.toString() !== req.user._id.toString()) {
          debug('middleware: is Not Authorized')
          return next({
            status: 401,
            message: 'User is not Authorized'
          })
        } else {
          debug('middleware: isAuthenticated')
          return next()
        }
      } else {
        debug('middleware: is Not Authorized ')
        return res.status(401).send({
          success: false,
          message: 'User needs to re-authenticated'
        })
      }
    })
  }
```

</p>
</details>



#### Code

```javascript
function deleteBlog(req, res, next) {
  req.blog.remove(function (error) {
    if (error) return next(error)
    res.status(204).send()
  })
}
```

</p>
</details>

<details><summary>/api/testing/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.status(200).send({
      query: req.queryParameters
    })
  }
```

</p>
</details>

<details><summary>/api/settings/ - GET</summary>
<p>








#### Code

```javascript
function (req, res, next) {
    res.send(require('pug').renderFile(path.join(__dirname, 'setting.view.pug'), {settings: settings}))
  }
```

</p>
</details>

<details><summary>/api/system/status - GET</summary>
<p>








#### Code

```javascript
function status(req, res, next) {
  res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/photos/upload - POST</summary>
<p>





#### Middleware

<details><summary>multerMiddleware</summary>
<p>

```javascript
function multerMiddleware(req, res, next) {
    if (!is(req, ['multipart'])) return next()

    var options = setup()

    var limits = options.limits
    var storage = options.storage
    var fileFilter = options.fileFilter
    var fileStrategy = options.fileStrategy
    var preservePath = options.preservePath

    req.body = Object.create(null)

    var busboy

    try {
      busboy = new Busboy({ headers: req.headers, limits: limits, preservePath: preservePath })
    } catch (err) {
      return next(err)
    }

    var appender = new FileAppender(fileStrategy, req)
    var isDone = false
    var readFinished = false
    var errorOccured = false
    var pendingWrites = new Counter()
    var uploadedFiles = []

    function done (err) {
      if (isDone) return
      isDone = true

      req.unpipe(busboy)
      drainStream(req)
      busboy.removeAllListeners()

      onFinished(req, function () { next(err) })
    }

    function indicateDone () {
      if (readFinished && pendingWrites.isZero() && !errorOccured) done()
    }

    function abortWithError (uploadError) {
      if (errorOccured) return
      errorOccured = true

      pendingWrites.onceZero(function () {
        function remove (file, cb) {
          storage._removeFile(req, file, cb)
        }

        removeUploadedFiles(uploadedFiles, remove, function (err, storageErrors) {
          if (err) return done(err)

          uploadError.storageErrors = storageErrors
          done(uploadError)
        })
      })
    }

    function abortWithCode (code, optionalField) {
      abortWithError(makeError(code, optionalField))
    }

    // handle text field data
    busboy.on('field', function (fieldname, value, fieldnameTruncated, valueTruncated) {
      if (fieldnameTruncated) return abortWithCode('LIMIT_FIELD_KEY')
      if (valueTruncated) return abortWithCode('LIMIT_FIELD_VALUE', fieldname)

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      appendField(req.body, fieldname, value)
    })

    // handle files
    busboy.on('file', function (fieldname, fileStream, filename, encoding, mimetype) {
      // don't attach to the files object, if there is no file
      if (!filename) return fileStream.resume()

      // Work around bug in Busboy (https://github.com/mscdex/busboy/issues/6)
      if (limits && limits.hasOwnProperty('fieldNameSize')) {
        if (fieldname.length > limits.fieldNameSize) return abortWithCode('LIMIT_FIELD_KEY')
      }

      var file = {
        fieldname: fieldname,
        originalname: filename,
        encoding: encoding,
        mimetype: mimetype
      }

      var placeholder = appender.insertPlaceholder(file)

      fileFilter(req, file, function (err, includeFile) {
        if (err) {
          appender.removePlaceholder(placeholder)
          return abortWithError(err)
        }

        if (!includeFile) {
          appender.removePlaceholder(placeholder)
          return fileStream.resume()
        }

        var aborting = false
        pendingWrites.increment()

        Object.defineProperty(file, 'stream', {
          configurable: true,
          enumerable: false,
          value: fileStream
        })

        fileStream.on('error', function (err) {
          pendingWrites.decrement()
          abortWithError(err)
        })

        fileStream.on('limit', function () {
          aborting = true
          abortWithCode('LIMIT_FILE_SIZE', fieldname)
        })

        storage._handleFile(req, file, function (err, info) {
          if (aborting) {
            appender.removePlaceholder(placeholder)
            uploadedFiles.push(extend(file, info))
            return pendingWrites.decrement()
          }

          if (err) {
            appender.removePlaceholder(placeholder)
            pendingWrites.decrement()
            return abortWithError(err)
          }

          var fileInfo = extend(file, info)

          appender.replacePlaceholder(placeholder, fileInfo)
          uploadedFiles.push(fileInfo)
          pendingWrites.decrement()
          indicateDone()
        })
      })
    })

    busboy.on('error', function (err) { abortWithError(err) })
    busboy.on('partsLimit', function () { abortWithCode('LIMIT_PART_COUNT') })
    busboy.on('filesLimit', function () { abortWithCode('LIMIT_FILE_COUNT') })
    busboy.on('fieldsLimit', function () { abortWithCode('LIMIT_FIELD_COUNT') })
    busboy.on('finish', function () {
      readFinished = true
      indicateDone()
    })

    req.pipe(busboy)
  }
```

</p>
</details>



#### Code

```javascript
function postPhoto(req, res, next) {
  debug('start postPhoto')

  if (req.file) {
    var filePath = path.resolve(__dirname, '../../../client/uploads/')
    fs.readFile(req.file.path, function (error, data) {
      if (error) {
        debug('end postPhoto')
        return res.status(400).send(error)
      }
      var createDir = filePath + '/' + req.file.originalname
      fs.writeFile(createDir, data, function (error) {
        if (error) {
          debug('end postPhoto')
          return res.status(400).send(error)
        } else {
          debug('end postPhoto')
          return res.status(201).send()
        }
      })
    })
  } else {
    debug('end postPhoto')
    return res.status(400).send()
  }
}
```

</p>
</details>

<details><summary>/api/user/authenticate - POST</summary>
<p>

#### Description 
  Authentication route




#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postAuthenticate(req, res, next) {
  debug('start postAuthenticate')
  var redirect = req.body.redirect || false
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('end postAuthenticate - Logged In')
  return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
}
```

</p>
</details>

<details><summary>/api/user/authenticate - GET</summary>
<p>

#### Description 
  Check Authentication
#### Method 
  get







#### Code

```javascript
function getAuthenticate(req, res) {
  debug('start getAuthenticate')
  var redirect = req.body.redirect || false
  var token = req.headers.authorization || req.query.token || req.body.token || ''// || req.headers['x-access-token']
  if (req.isAuthenticated()) {
    return res.status(200).send(exports.createResponseObject(req.user, tokenApi.createKey(req.user), redirect))
  } else if (token) {
    tokenApi.checkKey(token, function (error, user) {
      if (error) return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
      req.user = user
      return res.status(200).send(exports.createResponseObject(req.user, token, redirect))
    })
  } else {
    return res.status(200).send(exports.createResponseObject(req.user, '', redirect))
  }
  debug('end getAuthenticate')
}
```

</p>
</details>

<details><summary>/api/user/logout - POST</summary>
<p>








#### Code

```javascript
function logout(req, res) {
  debug('start logout')
  req.logout()
  debug('end logout')
  return res.status(200).send()
}
```

</p>
</details>

<details><summary>/api/user/forgot - POST</summary>
<p>








#### Code

```javascript
function postForgot(req, res, next) {
  debug('start postForgot')

  req.assert('email', 'Please enter a valid email address.').isEmail()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  auto({
    token: function (done) {
      crypto.randomBytes(16, function (error, buf) {
        var token = buf.toString('hex')
        done(error, token)
      })
    },
    user: ['token', function (results, callback) {
      User.findOne({ email: req.body.email.toLowerCase() }, function (error, user) {
        if (error) {
          debug('end postForgot')
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end postForgot')
          return res.status(200).send('/forgot')
        }
        user.resetPasswordToken = results.token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
        user.save(function (error) {
          callback(error, user)
        })
      })
    }],
    sendEmail: ['user', function (results, callback) {
      mail.send({
        to: results.user.email,
        subject: settings.email.templates.forgot.subject,
        text: settings.email.templates.forgot.text(req.headers.host, results.token)
      }, function (error) {
        callback(error, true)
      })
    }]
  }, function (error) {
    if (error) {
      return next(error)
    }
    debug('end postForgot')
    return res.status(200).send({ message: 'Email has been sent' })
  })
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - GET</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function getReset(req, res) {
  debug('start getReset')

  if (req.isAuthenticated()) {
    debug('end getReset')
    return res.status(400).send({
      message: 'Already authenticated',
      valid: false
    })
  } else {
    User
      .findOne({ resetPasswordToken: req.params.token })
      .where('resetPasswordExpires').gt(Date.now())
      .exec(function (error, user) {
        if (error) {
          return res.status(400).send(error)
        }
        if (!user) {
          debug('end getReset')
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.',
            valid: false
          })
        }
        debug('end getReset')
        res.status(200).send({
          message: 'token is valid',
          valid: true
        })
      })
  }
}
```

</p>
</details>

<details><summary>/api/user/reset/:token - POST</summary>
<p>



#### Params 
* token - **Required** 





#### Code

```javascript
function postReset(req, res, next) {
  debug('start postReset')

  req.assert('password', 'Password must be at least 4 characters long.').len(4)
  req.assert('confirmPassword', 'Passwords must match.').equals(req.body.password)
  var errors = req.validationErrors()

  if (errors) {
    debug('end postReset')
    return res.status(400).send({message: errors})
  } else {
    auto({
      user: function (callback) {
        User
          .findOne({ resetPasswordToken: req.params.token })
          .where('resetPasswordExpires').gt(Date.now())
          .exec(function (error, user) {
            if (error) {
              return next(error)
            }
            if (!user) {
              return res.status(400).send({message: 'no user found to reset password for. please hit reset password to get another token'})
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user.save(function (error) {
              if (error) {
                return next(error)
              }
              req.logIn(user, function (error) {
                callback(error, user)
              })
            })
          })
      },
      sendEmail: ['user', function (results, callback) {
        mail.send({
          to: results.user.email,
          subject: settings.email.templates.reset.subject,
          text: settings.email.templates.reset.text(results.user.email)
        }, function (error) {
          callback(error, true)
        })
      }]
    }, function (error, user) {
      if (error) {
        return next(error)
      }
      delete user.password
      var redirect = req.body.redirect || '/'
      debug('end postReset')
      return res.status(200).send(exports.createResponseObject(user, '', redirect))
    })
  }
}
```

</p>
</details>

<details><summary>/api/user/signup - POST</summary>
<p>








#### Code

```javascript
function postSignup(req, res, next) {
  debug('start postSignup')

  req.assert('profile', 'Name must not be empty').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password must be at least 6 characters long').len(6)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()
  var redirect = req.body.redirect || false
  if (errors) {
    debug('end postSignup')
    return res.status(400).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signup'
    })
  }
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.profile.name
    }
  })

  User.findOne({ email: req.body.email }, function (error, existingUser) {
    if (error) {
      return res.status(400).send(error)
    }
    if (existingUser) {
      debug('end postSignup')
      return res.status(400).send({ message: 'Account with that email address already exists.' })
    }
    user.save(function (error) {
      if (error && error.code === 11000) {
        debug('end postSignup')
        return res.status(400).send({ message: 'Account with that email address already exists.' })
      } else if (error && error.name === 'ValidationError') {
        var keys = _.keys(error.errors)
        debug('end postSignup')
        return res.status(400).send({ message: error.errors[keys[0]].message }) // error.message
      } else if (error) {
        next(error)
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error)
          } else {
            delete user['password']
            var token = tokenApi.createKey(user)
            res.cookie('token', token)
            debug('end postSignup')
            return res.status(200).send(exports.createResponseObject(user, token, redirect))
          }
        })
      }
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/profile - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdateProfile(req, res, next) {
  debug('start putUpdateProfile')
  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user = _.assign(user, req.body)
    user.save(function (error) {
      if (error) {
        return next(error)
      }
      req.user = user
      debug('end putUpdateProfile')
      return res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/password - PUT</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function putUpdatePassword(req, res, next) {
  debug('start putUpdatePassword')

  req.assert('password', 'Password must be at least 4 characters long').len(4)
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password)

  var errors = req.validationErrors()

  if (errors) {
    return res.status(200).send(errors)
  }

  User.findById(req.user.id, function (error, user) {
    if (error) {
      return next(error)
    }
    user.password = req.body.password
    user.save(function (error) {
      if (error) {
        return next(error)
      }

      debug('end putUpdatePassword')
      res.status(200).send()
    })
  })
}
```

</p>
</details>

<details><summary>/api/user/delete - DELETE</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function deleteDeleteAccount(req, res, next) {
  debug('start deleteDeleteAccount')

  User.remove({ _id: req.user.id }, function (error) {
    if (error) {
      return next(error)
    }
    req.logout()
    debug('end deleteDeleteAccount')
    return res.status(200).send()
  })
}
```

</p>
</details>

<details><summary>/api/user/token - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKey(req, res, next) {
  debug('start getKey')
  return res.json({token: tokenApi.createKey(req.user)})
}
```

</p>
</details>

<details><summary>/api/user/token - POST</summary>
<p>





#### Middleware

<details><summary>checkLoginInformation</summary>
<p>

```javascript
function checkLoginInformation(req, res, next) {
  debug('start checkLoginInformation')
  var redirect = req.body.redirect || false
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('password', 'Password cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()
  if (errors) {
    debug('end checkLoginInformation - Authentication failed. ' + errors[0].message)
    return res.status(401).send({
      success: false,
      authenticated: false,
      message: errors[0].message,
      redirect: '/signin'
    })
  } else {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error)
      if (!user) {
        debug('end checkLoginInformation')
        return res.status(400).send({
          success: false,
          authenticated: false,
          message: info.message,
          redirect: redirect
        })
      }
      req.logIn(user, function (error) {
        if (error) return next(error)
        debug('end checkLoginInformation')
        next()
      })
    })(req, res, next)
  }
}
```

</p>
</details>



#### Code

```javascript
function postKey(req, res, next) {
  debug('start postKey')
  var token = tokenApi.createKey(req.user)
  res.cookie('token', token)
  debug('start postKey')
  return res.json({token: token})
}
```

</p>
</details>

<details><summary>/api/user/token/reset - GET</summary>
<p>





#### Middleware

<details><summary>isAuthenticated</summary>
<p>

```javascript
function isAuthenticated(req, res, next) {
  debug('middleware: isAuthenticated')
  checkAuthenticated(req, function (error) {
    if (error) return res.status(401).send(error)
    return next()
  })
}
```

</p>
</details>



#### Code

```javascript
function getKeyReset(req, res, next) {
  debug('start getKeyReset')
  req.user.apikey = uuid.v4()
  req.user.save(function (error) {
    debug('start getKeyReset')
    if (error) return res.status(500).send(error)
    return res.json({token: tokenApi.createKey(req.user)})
  })
}
```

</p>
</details>

<details><summary>/api/seo/* - GET</summary>
<p>



#### Params 
* 0 - **Required** 





#### Code

```javascript
function (req, res) {
    seo(self, req, req.path.replace('/api/seo', ''), function (seoSettings) {
      res.send(seoSettings)
    })
  }
```

</p>
</details>

<details><summary>/:url(api|images|scripts|styles|components|uploads|modules)/* - GET</summary>
<p>



#### Params 
* url - **Required** 
* 0 - **Required** 





#### Code

```javascript
function (req, res) {
    res.status(400).send({
      error: 'nothing found at ' + req.path
    })
  }
```

</p>
</details>

<details><summary>/* - GET</summary>
<p>



#### Params 
* 0 - **Required** 





#### Code

```javascript
function (req, res, next) {
    seo(self, req, function (seoSettings) {
      ejs.renderFile(path.join(__dirname, './layout/index.html'), {
        html: seoSettings,
        googleAnalytics: self.settings.googleAnalytics,
        name: self.settings.app.name,
        assets: self.app.locals.frontendFilesFinal,
        environment: self.environment,
        user: req.user ? req.user : {}
      }, {
        cache: true
      }, function (error, str) {
        if (error) next(error)
        res.send(str)
      })
    })
  }
```

</p>
</details>
