FROM python:3.6
MAINTAINER Noel Wilson <jwnwilson@gmail.com>

# Install dependancies as one layer
# Reinstalling pip as not working with pipenv
RUN apt-get update && \
  apt-get install -y libmemcached-dev zlib1g-dev && \
  curl https://bootstrap.pypa.io/get-pip.py | python

# Add project files to DIR
COPY ./ops/bash/bashrc /root/.bashrc
COPY . /app

WORKDIR /app/src/server

# Some issues with pip 18.1 and pipenv
RUN pip3 install pip==18.0 && \
  pip3 install pipenv && \
  pipenv install --system --deploy

CMD gunicorn --worker-class gevent --timeout 30 --log-level DEBUG -w 3 -b 0.0.0.0:8000 webapp.wsgi
