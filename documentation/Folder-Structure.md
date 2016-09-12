## Folder Structure

### Frontend

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


### Backend

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **server**/layout/                 | Folder: Swig Layout before rendered to user                  |
| **server**/modules/                | Folder:all dynamic modules to run server side logic          |
| **server**/swagger/                | Folder:all files to display api documentation          |
| **server**/dist/                   | Folder:all files created by the system if you use babel         |
| **server**/environment.js             | File:This is a getter/setter for the env   |
| **server**/error.js             | File:This handles any unexpected errors in express |
| **server**/error.pug             | File:This is the template for error.js    |
| **server**/mail.js             | File:This gives you the ability to email   |
| **server**/middleware.js             | File:This holds all of the middleware to use   |
| **server**/passport.js             | File:This has the login system  |
| **server**/register.js             | File:This file registers all the dynamic frontend & backend modules    |
