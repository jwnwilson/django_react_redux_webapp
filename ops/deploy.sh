#! /bin/bash
cd /app
git pull
make docker_pull
make setup-network
make setup-prod
make down up