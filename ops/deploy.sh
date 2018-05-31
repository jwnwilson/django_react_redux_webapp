#! /bin/sh

# Build FE bundle
make build-fe
# Run on prod compose
make collect-static

# Build web docker image
docker-compose -f ./docker-production.yml build

# Deploy to cloud
