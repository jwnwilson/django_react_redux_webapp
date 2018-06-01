#! /bin/sh

# Build FE bundle
make build-fe
# Run Collect all static files in server dir
make collect-static

# Build web docker image with all static files
make build-prod

# Tag and push docker images
docker push jwnwilson/noelwilson2018-server
docker push jwnwilson/noelwilson2018-db
docker push jwnwilson/noelwilson2018-nginx

# Update images on prod machine
