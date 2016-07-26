### Prerequisites

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting.
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.

- <img src="http://bower.io/img/bower-logo.png" height="17">&nbsp; [Install Bower](http://bower.io/)
```bash
npm install -g bower
```

**Note:** If you are new to Node or Express, we recommend to watch
[Node.js and Express 101](https://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).


### Start

The easiest way to get started is to clone the repository:

``` bash
# Get the latest snapshot
git clone https://github.com/greenpioneersolutions/meanstackjs.git

# Change directory
cd meanstackjs

# Install NPM dependencies
npm install

# Start up the server
npm start
# or
node server.js
# or
nodemon server.js
```

**Note:** We highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node server.js` use `nodemon server.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.