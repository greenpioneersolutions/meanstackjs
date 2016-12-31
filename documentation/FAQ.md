### Frequently Asked Questions

#### 1. Error: listen EACCES 0.0.0.0

Try Running in Sudo or Admin access
sudo node index.js

``` bash
[UNCAUGHT EXCEPTION]
Error: listen EACCES 0.0.0.0:843
    at Object.exports._errnoException (util.js:856:11)
    at exports._exceptionWithHostPort (util.js:879:20)
    at Server._listen2 (net.js:1218:19)
    at listen (net.js:1267:10)
    at Server.listen (net.js:1363:5)
    at Mean.async.parallel.server (/Users/humphrey/Documents/repos/meanstackjs/server.mean.js:77:22)
``` 

#### 2. Error: connect ECONNREFUSED 127.0.0.1:27017

MongoDB is not running or your uri is not pointing to the correct place

``` bash
[UNCAUGHT EXCEPTION]
Error: connect ECONNREFUSED 127.0.0.1:27017
    at Object.exports._errnoException (util.js:856:11)
    at exports._exceptionWithHostPort (util.js:879:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1057:14)
```


#### 3. xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun

Have you sud­denly started get­ting the fol­low­ing error in your project?

``` bash
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
````
Solution

``` bash
xcode-select --install
```
[Credit](http://tips.tutorialhorizon.com/2015/10/01/xcrun-error-invalid-active-developer-path-library-developer-commandline-tools-missing-xcrun/)

#### 4. Angularjs: Error: [ng:areq] Argument 'HomeController' is not a function, got undefined

This creates a new module/app:

`var myApp = angular.module('myApp',[]);`

While this accesses an already created module (notice the omission of the second argument):

`var myApp = angular.module('myApp');`

Since you use the first approach on both scripts you are basically overriding the module you previously created.

On the second script being loaded, use `var myApp = angular.module('myApp');`

[Credit](http://stackoverflow.com/a/25895387)