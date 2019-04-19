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

RUN pip3 install pipenv && \
  pipenv install --system --deploy

CMD celery worker --app=webapp.celery.app --beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
