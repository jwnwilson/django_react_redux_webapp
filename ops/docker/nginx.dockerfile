FROM wernight/alpine-nginx-pagespeed:latest

RUN apk update && \
  apk upgrade && \
  apk --update add --no-cache curl && \
  apk --update add --no-cache certbot

COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./ops/nginx/django.conf /etc/nginx/sites-enabled/
COPY ./src/server/staticfiles /app/src/server/staticfiles
