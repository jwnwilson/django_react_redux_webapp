#! /bin/sh

# Build FE bundle
make build-fe
# Run on prod compose
make collect-static

# Build web docker image

# Deploy to cloud
