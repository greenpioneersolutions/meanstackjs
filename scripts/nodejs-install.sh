#!/bin/bash
# if you need more help installing node - https://gist.github.com/isaacs/579814
#
CURRENT=`pwd`
DOWNLOADSDIR="$CURRENT/downloads/node-v6.9.2-linux-x64.tar.gz"

if [ ! -e index.js ]
then
	echo "Please run the nodejs-install.sh script from the main root directory"
	echo "i.e: bash scripts/nodejs-install.sh"
	echo "Or by npm run nodejs-install"
	exit -1
fi
mkdir -p ./downloads
cd ./downloads
curl -O https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-x64.tar.gz
cd /usr/local
tar --strip-components=1 -xzf "$DOWNLOADSDIR"
curl https://www.npmjs.org/install.sh | sh
node -v


exit;