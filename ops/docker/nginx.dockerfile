FROM nginx:latest

COPY ./ops/nginx.conf /etc/nginx/nginx.conf
COPY ./ops/django /etc/nginx/sites-enabled/
COPY ./src/server/staticfiles /app/src/server/staticfiles
