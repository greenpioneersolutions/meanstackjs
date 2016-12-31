#!/bin/bash
echo -e "\033[1mTo set proxies please enter your proxy in <url-proxy> EX. http://proxy.greenpioneersolutions.com:8080\033[0m"
echo -e "\033[1mExport Proxies Set in windows - run these commands\033[0m"
echo ''
echo 'set https_proxy="<url-proxy>" '     
echo 'set http_proxy="<url-proxy>"'   
echo ''
echo ''
echo -e "\033[1mExport Proxies Set in linux,mac - run these commands\033[0m"
echo ''
echo 'export https_proxy="<url-proxy>" '     
echo 'export http_proxy="<url-proxy>"'   
echo ''
echo ''
echo -e "\033[1mGit Proxies Set- run these commands\033[0m"
echo ''
echo 'git config --global https.proxy "<url-proxy>"'
echo 'git config --global http.proxy "<url-proxy>"'
echo ''
echo ''
echo -e "\033[1mNPM Proxy Set- run these commands\033[0m"
echo ''
echo 'npm config set proxy "<url-proxy>"'
echo 'npm config set https-proxy "<url-proxy>"'
echo ''
echo ''
