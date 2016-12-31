## Project Structure

| Name                                | Description                                                  |
| ----------------------------------  | ------------------------------------------------------------ |
| **client**/                         | Folder:all public frontend files                             |
| **commands**/                       | Folder:all Meanstackjs CLI                                   |
| **configs**/                        | Folder:all configuration files                               |
| **database**/                       | Folder:all database files if you install through our cli     |
| **documentation**/                  | Folder:all documentation files                               |
| **downloads**/                      | Folder:all downloaded files if you install anything in cli   |
| **node_modules**/                   | Folder:node js modules                                       |
| **scripts**/                        | Folder:all scripts files you or our cli will use             |
| **server**/                         | Folder:all private backend files                             |
| **tools**/                          | Folder:all meanstackjs tools ex. agenda,livereload ...etc    |
| **.bowerrc**                        | Bower configuration                                          |
| **.gitignore**                      | Files and Folders to ignore with GIT                         |
| **bower.json**                      | Frontend library dependencies                                |
| **index.js**                        | Main server file that will run the system                    |
| **package.json**                    | NodeJS configuration                                         |
| **README.md**                       | Documentation                                                |
| **run.js**                          | Used to run/start any server you create ex.mean or socketio  |
| **server.mean.js**                  | Mean server file that uses server folder                     |
| **server.socketio.js**              | Socketio server file that is independent of everything       |

### Server Structure

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **server**/layout/                 | Folder: Swig Layout before rendered to user                  |
| **server**/modules/                | Folder:all dynamic modules to run server side logic          |
| **server**/error.js             | File:This handles any unexpected errors in express and exposes a log & middleware|
| **server**/mail.js             | File:This gives you the ability to email   |
| **server**/middleware.js             | File:This holds all of the middleware to use   |
| **server**/passport.js             | File:This has the login system  |
| **server**/register.js             | File:This file is used to gather all modules to gether and to register them properly   |
| **server**/cdn.js             | File:This file is for those using a cdn like maxcdn  |
| **server**/config.js             | File:This file is used to set up expressjs initially, middleware & passport |
| **server**/db.js             | File:This file is to connect to the database in the start of the build process  |
| **server**/headers.js             | File:This file is used to set up the headers that go out on every route   |
| **server**/logger.js             | File:This file is used to set up our morgan logger & debug statements on all routes   |
| **server**/prerenderer.js             | File:This file is used by seo to prerender certain requests   |
| **server**/routes.js             | File:This file is used to set up all system static routes including the main '/*' route with ejs templating  |
| **server**/security.js             | File:This file is used to set up helmet, hpp, cors & content length    |
| **server**/seo.js             | File:This file is used for the main route to properly response to all request for seo  |

### Client Structure

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **client**/bower_components/       | Folder:all frontend dependencies                             |
| **client**/images/                 | Folder:all Global images                                     |
| **client**/modules/                | Folder:all dynamic modules to run mean stack js              |
| **client**/styles/                 | Folder:all Global styles                                     |
| **client**/uploads/                | Folder:all Global uploads                                    |

