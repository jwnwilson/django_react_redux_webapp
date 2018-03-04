#! /bin/bash

#Setup ssl
certbot certonly -n -m jwnwilson@hotmail.co.uk --agree-tos --webroot --webroot-path=/var/www/html -d noel-wilson.co.uk -d www.noel-wilson.co.uk -d jwnwilson.com -d www.jwnwilson.com --expand
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
