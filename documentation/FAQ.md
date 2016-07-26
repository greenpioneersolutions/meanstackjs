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