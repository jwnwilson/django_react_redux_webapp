FROM nginx:latest

RUN apt-get update && \
  apt-get install -y software-properties-common && \
  apt-get update && \
  apt-get install -y curl dnsutils && \
  apt-get install -y certbot python-certbot-apache

COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./ops/nginx/django.conf /etc/nginx/sites-enabled/
COPY ./src/server/staticfiles /app/src/server/staticfiles
