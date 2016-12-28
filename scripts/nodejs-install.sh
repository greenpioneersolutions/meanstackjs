#!/bin/bash
# if you need more help installing node - https://gist.github.com/isaacs/579814
#
# Uncomment if you need for a linux server in the cloud
# 	CURRENT=`pwd`
# 	DOWNLOADSDIR="$CURRENT/downloads/node-v6.9.2-linux-x64.tar.gz"
# 	if [ ! -e index.js ]
# 	then
# 		echo "Please run the nodejs-install.sh script from the main root directory"
# 		echo "i.e: bash scripts/nodejs-install.sh"
# 		echo "Or by npm run nodejs-install"
# 		exit -1
# 	fi
# 	mkdir -p ./downloads
# 	cd ./downloads
# 	curl -O https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-x64.tar.gz
# 	cd /usr/local
# 	tar --strip-components=1 -xzf "$DOWNLOADSDIR"
# 	node -v


if [ "$(uname)" == "Darwin" ]; then
	echo "You're using macOS. Checking for Node.js installation."
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	echo "You're using Linux. Checking for Node.js installation."
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    echo "Please download Node.js from https://nodejs.org and install it."
    exit 1
fi

if which node >/dev/null; then
	echo "Node.js is already installed."
	exit
fi

NVM_DIRECTORY="$HOME/.nvm"
if [ -d "$NVM_DIRECTORY" ]; then
	echo "nvm is already installed. Please run the following command to install Node.js."  
	echo -e "\033[1m nvm install 6.9.2\033[0m"
else
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
	echo ""
	echo -e "\033[1mAfter loading nvm (please run the above commands), then run manually:\033[0m"
	echo ""	
	echo " nvm install 6.9.2"
fi