#!/bin/bash

if [ ! -e index.js ]
then
	echo "Please run the generate-ssl-certs.sh script from the main root directory"
	echo "i.e: bash scripts/generate-ssl-certs.sh"
	echo "Or by npm run generate-ssl-certs"
	exit -1
fi

echo "Generating self-signed certificates..."

mkdir -p ./configs/certificates
openssl req -x509 -newkey rsa:2048 -keyout ./configs/certificates/key.pem -out ./configs/certificates/cert.pem -days 365
openssl rsa -in ./configs/certificates/key.pem -out ./configs/certificates/newkey.pem && mv ./configs/certificates/newkey.pem ./configs/certificates/key.pem

if [ ! -e ./configs/certificates/key.pem ]
then
	echo "Error has occured creating the key.pem"
	exit -1
fi

if [ ! -e ./configs/certificates/cert.pem ]
then
	echo "Error has occured creating the cert.pem"
	exit -1
fi

echo "Generated self-signed certificates at ./configs/certificates/key.pem & ./configs/certificates/cert.pem"