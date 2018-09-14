web: gunicorn --pythonpath ./src/server webapp.wsgi --log-file -
worker: sh -c "cd src/server && celery -A webapp worker --beat --scheduler django_celery_beat.schedulers:DatabaseScheduler -l info"
