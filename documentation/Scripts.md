### Generate-ssl-certs.sh

How to generate your own certs for https.

``` bash
# used to generate your ssl certs - really good for testing ssl out
bash ./scripts/generate-ssl-certs.sh
# used to install mongodb into the project to help those out who dont know mongodb
bash ./scripts/mongodb-install.sh
# used to switch node versions easily with nvm
bash ./scripts/nodejs-change-version.sh
# used to install nodejs with nvm
bash ./scripts/nodejs-install.sh
# used to set proxies need to run our stack if your behind a firewall that needs a proxy
bash ./scripts/set-proxies.sh
# used to start of mongod regardless where it is install - as long as it is in the path
bash ./scripts/start-mongod.sh
# used to delete all proxy configs
bash ./scripts/unset-proxies.sh
# used to help users stack up todate on verisons of the mean stack by helping them merge
node ./scripts/update-meanstackjs.js
# used to install the tools
node ./scripts/postinstall.js
```
