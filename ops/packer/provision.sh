#!/bin/bash

sudo apt-get update -q

sudo apt-get install -q -y \
	-o Dpkg::Options::="--force-confdef" \
	-o Dpkg::Options::="--force-confold" \
	docker.io

sudo apt-get install -y postgresql postgresql-contrib

pip install awscli

# make sure docker is running and containers can be run without sudo
sudo /etc/init.d/docker start
sudo gpasswd -a ubuntu docker
