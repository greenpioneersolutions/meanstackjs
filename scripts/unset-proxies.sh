#!/bin/bash
export https_proxy=""
export http_proxy=""
unset https_proxy
unset http_proxy
echo "Export Proxies Unset"
git config --global --unset https.proxy 
git config --global --unset http.proxy 
echo "Git Proxies Unset"
npm config rm proxy
npm config rm https-proxy
echo "NPM Proxies Unset"
echo "Unset All Proxies"
