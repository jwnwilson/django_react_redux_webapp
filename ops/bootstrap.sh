#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"

# Install dependancies
ssh root@${SERVER_IP} "
  add-apt-repository ppa:certbot/certbot &&
  apt-get update &&
  apt-get -y upgrade &&
  apt-get install -y make &&
  apt-get install -y nginx &&
  apt-get install -y certbot &&
  apt-get install -y zip &&
  apt-get install -y supervisor
"
# Docker dependancies
ssh root@${SERVER_IP} "
  apt-get install -y apt-transport-https ca-certificates curl software-properties-common &&
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - &&
  add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable' &&
  apt-get update &&
  apt-get install -y docker-ce &&
  curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` > ./docker-compose &&
  mv ./docker-compose /usr/bin/docker-compose &&
  chmod +x /usr/bin/docker-compose
"

# Allocate swap space
ssh root@${SERVER_IP} "
  fallocate -l 1G /swapfile
  mkswap /swapfile
  chmod 600 /swapfile
  swapon /swapfile"

# Expose ports
ssh root@${SERVER_IP} "ufw allow 'Nginx HTTP'"

# Setup ssl
ssh root@${SERVER_IP} "certbot certonly -n -m jwnwilson@hotmail.co.uk --agree-tos --webroot --webroot-path=/var/www/html -d noel-wilson.co.uk -d www.noel-wilson.co.uk -d jwnwilson.com -d www.jwnwilson.com"
ssh root@${SERVER_IP} "openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048"

# Add cronjob
crontab -l | { cat; echo "0 0 1 * * /opt/apps/currnet/ops/update_ssl.sh"; } | crontab -

# Cache dir
ssh root@${SERVER_IP} "mkdir /tmp/cache"
