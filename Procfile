web: gunicorn --pythonpath ./src/server webapp.wsgi --log-file -
worker: sh -c "cd src/server && celery -A webapp worker -l info"
beat: sh -c "cd src/server && celery -A webapp beat"
