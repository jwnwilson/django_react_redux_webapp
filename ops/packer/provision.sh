#!/bin/bash

sudo apt-get install software-properties-common
sudo apt-add-repository universe
sudo apt-add-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) main universe"

sudo apt-get update -q

sudo apt-get install -q -y \
	-o Dpkg::Options::="--force-confdef" \
	-o Dpkg::Options::="--force-confold" \
	docker.io

sudo apt-get install -y \
	postgresql postgresql-contrib \
	python-pip build-essential

pip install awscli
pip install docker-compose

sudo mkdir /app
sudo chown ubuntu /app
sudo chmod 755 /app/ops/deploy.sh

git clone https://github.com/jwnwilson/django_react_redux_webapp.git /app

# make sure docker is running and containers can be run without sudo
sudo /etc/init.d/docker start
sudo gpasswd -a ubuntu docker
