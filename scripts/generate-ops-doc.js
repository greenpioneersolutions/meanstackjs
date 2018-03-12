var fs = require('fs')
var path = require('path')
var glob = require('glob')
var changelog = fs.readFileSync('./documentation/Changelog.md')
var cli = fs.readFileSync('./documentation/CLI.md')
var client = fs.readFileSync('./documentation/Client.md')
var configs = fs.readFileSync('./documentation/Configs.md')
var errors = fs.readFileSync('./documentation/Errors.md')
var faq = fs.readFileSync('./documentation/FAQ.md')
var fileNamingStructure = fs.readFileSync('./documentation/File-Naming-Structure.md')
var folderStructure = fs.readFileSync('./documentation/Folder-Structure.md')
var gettingStarted = fs.readFileSync('./documentation/Getting-Started.md')
var home = fs.readFileSync('./documentation/Home.md')
var roadMap = fs.readFileSync('./documentation/Roadmap.md')
var scripts = fs.readFileSync('./documentation/Scripts.md')
var server = fs.readFileSync('./documentation/Server.md')
var servers = fs.readFileSync('./documentation/Servers.md')
var testing = fs.readFileSync('./documentation/Testing.md')
var tools = fs.readFileSync('./documentation/Tools.md')
var api
if (fs.existsSync('./documentation/API.md')) {
  api = fs.readFileSync('./documentation/API.md')
} else {
  api = require('./generate-api-doc.js')
}
var packageJson = require('../package.json')
var tool = glob.sync('./tools/*')
var OperationsDocument = `
# Operation Document for ${packageJson.name} - ${packageJson.version}
## Table Of Contents<a name="TableOfContents"></a>\n
1. [Table Of Contents](#TableOfContents)
2. [Learn](#Learn)
    * MeanStackJS Info
        * Why Mean Stack JS
        * How to Learn Mean Stack JS
        * What is Mean Stack JS?
        * Pre-Requisites
    * Getting Started
        * Prerequisites: Option 1
        * Prerequisites: Option 2
        * Start
        * Testing
    * File Naming Structure
        * Modules
        * Available Keywords to use for 'FILE_TYPE_IDENTIFIER'
    * Folder Structure
        * Project Structure
        * Server Structure
        * Client Structure
    * Configs
        * Settings Usage
        * Seo.js
        * Environment.js
        * Configs are based off env
        * Settings.js
    * Client
        * Client Structure
        * Mean Stack JS Dependencies
        * File Structure
        * Frontend Modules
            * Adding a Module
            * Removing a Module
        * Styles
        * Angular Routes
        * Retrieving User Data and State
        * Logging and Alerts
        * Views
        * Form Validation
        * Adding Dependencies
        * Testing
        * Overview
        * Global.styles.scss
        * Module specific styling
        * Environment based compiling
    * Server
        * Server Structure
        * How Server.Mean.Js Works
        * How Register.js Works
        * Create a route
        * Create a route & pass arguments
        * Create a Model/Schema
        * Validate a Model/Schema
        * Create a Middleware
        * Create Pug Route
        * Create Test Spec
        * Send Mail
        * Get Settings
        * Add Swagger
        * Validate Route Params
    * Servers
        * server.mean.js
        * server.socketio.js
3. [API](#API)
4. [Tasks](#Tasks)
    * Errors
        * Where do we catch our errors ?
        * How do we log our errors
        * server.error.js:log - system error log
    * Testing
        * NPM Test / Everything
        * Nightwatch / E2E
        * Karma / Frontend
        * Mocha & Chai / Backend
        * Standard / JS Style
        * Need help installing?
    * Scripts
    * Command Line Interface (CLI)
    * Tools
        * Livereload
        * Mongo Express
        * Agenda
        * Swagger 
        * Plato
5. [Information](#Information)
    * Versions
        * Dependencies
        * Dev Dependencies
    * Frequently Asked Questions (FAQ)
        * 1. Error: listen EACCES 0.0.0.0
        * 2. Error: connect ECONNREFUSED 127.0.0.1:27017
        * 3. xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun
        * 4. Angularjs: Error: [ng:areq] Argument 'HomeController' is not a function, got undefined
    * Roadmap
        * Meanstackjs 1.x - Goal is to support Enterprises
        * Meanstackjs 2.x - Goal is to support Open Source Comp
    * Changelog
\n


## Overview <a name="Overview"></a>\n

| Name        | Info           |
| ------------- |:-------------:|
| Date     | ${Date()} |
| Version     | ${packageJson.version} |
| Repository     | ${packageJson.repository} |
| homepage     | ${packageJson.homepage} |
| keywords     | ${packageJson.keywords} |
| author     | ${packageJson.author} |
| contributors     | ${packageJson.contributors} |
| license     | ${packageJson.license} |
| Bugs     | ${packageJson.bugs.url} |
| Tools     |  |
`
for (let index = 0; index < tool.length; index++) {
  OperationsDocument += `|   | ${tool[index].split(path.sep)[2]} - ${require('../' + tool[index] + '/package.json').version}|  \n`
}
OperationsDocument += home + '\n'
OperationsDocument += `## Learn <a name="Learn"></a>\n` + gettingStarted + '\n' + fileNamingStructure + '\n' + folderStructure + '\n' + configs + '\n' + client + '\n' + server + '\n' + servers + '\n'
OperationsDocument += `
<a name="API"></a>\n
${api}\n
`

OperationsDocument += `## Tasks <a name="Tasks"></a>\n` + errors + '\n' + testing + '\n' + scripts + '\n' + cli + '\n' + tools + '\n'
OperationsDocument += `## Information <a name="Information"></a>\n` + ' ### Versions \n  #### Dependencies\n``` js \n' + ` ${JSON.stringify(packageJson.dependencies, null, 2)}` + '```\n#### Dev Dependencies\n``` js \n' + ` ${JSON.stringify(packageJson.devDependencies, null, 2)}` + '```\n' + faq + '\n' + roadMap + '\n' + changelog + '\n'

fs.writeFileSync('./documentation/Operations-Document.md', OperationsDocument)
