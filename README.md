[![dependencies](https://david-dm.org/greenpioneer/meanstackjs.svg)](https://david-dm.org/greenpioneer/meanstackjs)
[![npm-issues](https://img.shields.io/github/issues/GreenPioneer/meanstackjs.svg)](https://github.com/GreenPioneer/meanstackjs/issues)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![meanstackjs Logo](http://meanstackjs.com/images/logo/header3x.png)](http://meanstackjs.com/)
-----------------
We are building in this framework to make your life as a designer or developer easier. We believe in making this framework usable for User Experience Designers, Quality Assurance Engineers, Software Engineers, Frontend & Backend Developers & Full Stack Engineers... etc. Were doing this by having key features in the framework we like we listed below:

- Customizable CLI for scaffolding of modules
- Can Build Dynamic Api's based off Schema
- Can Open Dynamic Query with routes
- LiveReload & Recompile in Development Env
- Not Dependent on Grunt or Gulp 
- No Magic Wand
- Uses JS Standard & John Papa Angular Style
- UI framework agnostic - Use Boostrap , Materialize or Foundation
- Supports CSS, SCSS & LESS
- Simple Project Structure
- Supports Clustering
- Supports Environments: Development, Test & Production

Those are just some of the reasons why we believe using mean stack js will help you in your development. What we want to do moving forward with this project is to layout a road map so that you can give your thoughts and let us know what we can add to make your life easier with this framework. We welcome all of those who wish to contribute and be apart of this. Join us in building and using the newest style in mean stacks


What is Mean Stack JS
-----------------

- [MongoDB](https://www.mongodb.org/) - MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable.
- [Express](http://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.
- [AngularJS](https://angularjs.org/) - based framework. -AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.
- [Node.js](http://www.nodejs.org/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.


Table of Contents
-----------------
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Theming Styling](#Theming-Styling)
- [Framework Structure](#framework-structure)
- [Framework Coding Styles](#Styles)
- [Working with CLI](#cli)
- [Contributing](#contributing)
- [License](#license)

Prerequisites
-------------

- <img src="https://www.mongodb.com/assets/global/favicon-bf23af61025ab0705dc84c3315c67e402d30ed0cba66caff15de0d57974d58ff.ico" height="17">&nbsp; [Download](https://www.mongodb.org/downloads) and Install mongodb - <a href="https://docs.mongodb.org/manual/">Checkout their manual</a> if you're just starting.
  - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp; [OSX MongoDB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp; [Windows Mongodb](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
  - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp; [Linux Mongodb](https://docs.mongodb.org/manual/administration/install-on-linux/)
- <img src="https://nodejs.org/static/apple-touch-icon.png" height="17">&nbsp; [Download](http://nodejs.org) and Install Node.js  - nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.

- <img src="http://bower.io/img/bower-logo.png" height="17">&nbsp; [Install Bower](http://bower.io/)
```bash
$ npm install -g bower
```

**Note:** If you are new to Node or Express, we recommend to watch
[Node.js and Express 101](https://www.youtube.com/watch?v=BN0JlMZCtNU)
screencast by Alex Ford that teaches Node and Express from scratch. Alternatively,
here is another great tutorial for complete beginners - [Getting Started With Node.js, Express, MongoDB](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/GreenPioneer/meanstackjs.git

# Change directory
cd meanstackjs

# Install NPM dependencies
npm install

node server.js
```

**Note:** We highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node server.js` use `nodemon server.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.

Documentation
-----------------

Coming Soon - Until this is documented please take a look a the code we have provide 

Theming Styling
-----------------

### Overview
We've set up this framework to automatically aggregate, compile and reference all styling files likes css, scss and less. You can use any of the styling syntax. We don't care. We made it easy for you to get going and style it out. Although we prefer usage of scss.

We wanted this mean framework to be UI framework agnostic. Meaning anyone should be able to choose different UI frameworks that suits their cup of tea and needs. We've used bootstrap as an example. Frameworks like bootstrap, zurb foundation and material interchangeable. The mean framework is not dependent on them.


### Global.styles.scss
This is the file where most of the magic will happen. This is where you will import framework styles, import custom variables override UI framework variables and define sitewide styles to create your custome theme.


### Module specific styling
In each module you can include a .scss file. This is where you can define module specific styles so that you can easily debug and change styles in development.

### Environment based compiling
As you get to a solid code base. We want some optimized code and file size. Setting the mean framework into a production state will compile and minify all the styling files.

For development module.style files will be compliled and referenced independently. Making it easy debug and find where the styling code is.

Framework Structure
-----------------

### Modules

We have implemented modules with a specific file naming convention for server & client side coding. Each module has a unique such as `blog`. Inside of each module you specific files named as such `UNIQUE_NAME.FILE_TYPE_IDENTIFIER.FILE_EXTENSION` 

Examples on the frontend  include :

- `blog.controller.js`
- `email.controller.js`
- `blog.factory.js`
- `auth.factory.js`
- `blog.module.js`
- `blog.routes.js.js`
- `blog.style.css`
- `blog.style.scss`
- `list.style.less`
- `create.view.html`

Examples on the backend  include :

- `blog.controller.js`
- `blog.model.js`
- `blog.routes.js`

### Available Keywords to use for `FILE_TYPE_IDENTIFIER`

| FRONTEND                                | BACKEND                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| `module` | `models` |
| `controller` | `controller` |
| `routes` | `routes` |
| `config` | |
| `service` | |
| `provider` | |
| `directive` | |
| `style` | |
| `json` | |
| `view` | |

Once everthing is set up properly we then register all modules and all of its content appropriately on `server.js` startup. 

### File Structure

| Name                                | Description                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| **client**/                         | Folder:all public frontend files                             |
| **commands**/                       | Folder:all Meanstackjs CLI                                   |
| **configs**/                        | Folder:all configuration files                               |
| **node_modules**/                   | Folder:node js modules                                       |
| **server**/                         | Folder:all private backend files                             |
| **.bowerrc**                        | Bower configuration                                          |
| **.gitignore**                      | Files and Folders to ignore with GIT                         |
| **bower.json**                      | Frontend library dependencies                                |
| **index.js**                        | Main server file that will run the system                    |
| **package.json**                    | NodeJS configuration                                         |
| **README.md**                       | Documentation                                                |


#### Client

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **client**/bower_components/       | Folder:all frontend dependencies                             |
| **client**/images/                 | Folder:all Global images                                     |
| **client**/modules/                | Folder:all dynamic modules to run mean stack js              |
| **client**/styles/                 | Folder:all Global styles                                     |
| **client**/uploads/                | Folder:all Global uploads                                    |


#### Server

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **server**/layout/                 | Folder: Swig Layout before rendered to user                  |
| **server**/modules/                | Folder:all dynamic modules to run server side logic          |
| **server**/register.js             | File:This runs and registers all fo the modules and files    |

#### commands

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **commands**/create.js             | `Create` Command for scaffolding.  |

Styles
-------------

### John Papa Angular Style Guide

- [Check out here](https://github.com/johnpapa/angular-styleguide)

### JavaScript Standard Style
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
- **2 spaces** – for indentation
- **Single quotes for strings** – except to avoid escaping
- **No unused variables** – this one catches *tons* of bugs!
- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
- **Never start a line with `(` or `[`**
  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
  - [More details][4]
- **Space after keywords** `if (condition) { ... }`
- **Space after function name** `function name (arg) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
- Always handle the node.js `err` function parameter
- Always prefix browser globals with `window` – except `document` and `navigator` are okay
  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.
- **And [more goodness][5]** – *give `standard` a try today!*

[1]: http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding
[2]: http://inimino.org/~inimino/blog/javascript_semicolons
[3]: https://www.youtube.com/watch?v=gsfbh17Ax9I
[4]: RULES.md#semicolons
[5]: RULES.md#javascript-standard-style

To get a better idea, take a look at
[a sample file](https://github.com/feross/bittorrent-dht/blob/master/client.js) written
in JavaScript Standard Style, or check out some of
[the repositories](https://github.com/feross/standard-packages/blob/master/standard.json) that use
`standard`.

CLI
---------------------------------
[![meanstackjs CLI](http://meanstackjs.com/images/CLI.png)](http://meanstackjs.com/)
```bash
$ npm run cli
```

### Current Menu Options

- Module Creation:
   - Create Schema
   - Create Frontend Module
   - Create Backend Module
   - Create Frontend & Backend Module

- User Management:
   - Create User(In Dev - Currently N/A)
   - Change Password
   - Change User Roles
   - View User
- Exit


License
---------------------------------
The MIT License (MIT)

Copyright (c) 2014-2015 Green Pioneer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Contributing
---------------------------------
### How to contribute

Support and contributions from the open source community are essential for keeping
Mean Stack JS up to date. We are always looking for the quality contributions and 
will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please make sure that your contribution fits well in the project's style & concept:
  * JS Standard
  * John Papa angular style guide
  * Pass All Test ( once testing has been implement)

### Creating an Issue

Before you create a new Issue:
* Check the [Issues](https://github.com/GreenPioneer/meanstackjs/issues) on Github to ensure one doesn't already exist.
* Clearly describe the issue, including the steps to reproduce the issue.
* If it's a new feature, enhancement, or restructure, Explain your reasoning on why you think it should be added, as well as a particular use case.

### Making Changes

* Create a topic branch from the master branch.
* Use `standard` to verify your style - `npm install -g standard` if you dont have it already
* Keep git commit messages clear and appropriate
* Make Sure you have added any tests necessary to test your code.
* Update the Documentation to go along with any changes in functionality / improvements in a separate pull request against the gh-pages branch.

### Submitting the Pull Request

* Push your changes to your topic branch on your fork of the repo.
* Submit a pull request from your topic branch to the development branch
* We use [GitFlow](https://guides.github.com/introduction/flow/)
* Be sure to tag any issues your pull request is taking care of / contributing to.
	* By adding "Closes #xyz" to a commit message will auto close the issue once the pull request is merged in.

Influences
---------------------------------
- [Feross](https://github.com/feross)
- [Sahat](https://github.com/sahat) 
- [Johnpapa](https://github.com/johnpapa)
- [Linnovate with Mean io](https://github.com/linnovate/mean) 
- [Meanjs.org with Meanjs ](https://github.com/meanjs/mean) 

Credit
---------------------------------
- [Green Pioneer with structure, layout & implementation](https://github.com/greenpioneer) 
- [6StringCodes with ux design](https://github.com/6StringCodes) 
- [David Mogolov with content](http://davidmogolov.com/) 
- [Rajee Jones with logo design](https://www.linkedin.com/in/rajeejones)
