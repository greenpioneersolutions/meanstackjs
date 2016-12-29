#!/bin/bash
# if you need more help installing node - https://gist.github.com/isaacs/579814
#

if [ "$(uname)" == "Darwin" ]; then
	echo "You're using macOS."
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	echo "You're using Linux."
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
    echo "Please Update Node.js from https://nodejs.org and install it."
    exit 1
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

if ! [ -x "$(command -v nvm)" ]; then
  echo "Please install nvm and try again."
  exit 1
fi

echo "Please enter a version of Node.js"
read input_variable
nvm install $input_variable
