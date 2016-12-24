#!/bin/bash
echo "Please enter your proxy EX. http://proxy.greenpioneersolutions.com:8080"
read input_variable
export https_proxy="$input_variable"
export http_proxy="$input_variable"
echo "Export Proxies Set"
git config --global https.proxy "$input_variable"
git config --global http.proxy "$input_variable"
echo "Git Proxies Set"
npm config set proxy "$input_variable"
npm config set https-proxy "$input_variable"
echo "NPM Proxy Set"
echo "All proxies set to $input_variable"
