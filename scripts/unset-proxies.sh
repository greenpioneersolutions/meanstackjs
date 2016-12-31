#!/bin/bash
echo -e "\033[1mTo Unset in windows - run these commands\033[0m"
echo ''
echo 'set https_proxy=""'
echo 'set http_proxy=""'
echo ''
echo ''
echo -e "\033[1mExport Proxies Unset linux,mac - run these commands\033[0m"
echo ''
echo 'export https_proxy=""'
echo 'export http_proxy=""'
echo 'unset https_proxy'
echo 'unset http_proxy'
echo ''
echo ''
echo -e "\033[1mUnset Git - run these commands\033[0m"
echo ''
echo 'git config --global --unset https.proxy '
echo 'git config --global --unset http.proxy '
echo ''
echo ''
echo -e "\033[1mUnset NPM - run these commands\033[0m"
echo ''
echo 'npm config rm proxy'
echo 'npm config rm https-proxy'
echo ''
echo ''

