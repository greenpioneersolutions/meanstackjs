
## Prerequisites: Option 1

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting.
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.

## Prerequisites: Option 2

Download our repo & run CLI - NOTE: not for windows users. Please use the links above to install

We have built in all of the installs in our system to help new users or to help people install in cloud envs.

``` bash
npm run cli
# select - Mean Stack JS Install Dependencies
# the select - Install MongoDB
# in a new window or tab select - Start Mongod
```
## Start

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
node index.js
# or
nodemon index.js
```

## Testing

Easiest way to start testing your whole system 

``` bash
npm run cli
# select - Install Selenium Server
# once installed - Start Selenium Server
npm test
```

Note you must have mongodb running and if you dont then 
``` bash
npm run cli
# the select - Install MongoDB
# in a new window or tab select - Start Mongod
```