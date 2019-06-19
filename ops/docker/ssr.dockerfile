FROM buildkite/puppeteer
MAINTAINER Noel Wilson <jwnwilson@gmail.com>

# Add project files to DIR
COPY ./ops/bash/bashrc /root/.bashrc
COPY . /app

WORKDIR /app/src/server

CMD npm run start
