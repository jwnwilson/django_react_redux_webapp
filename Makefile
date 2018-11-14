-include .env
-include web.env

ifndef VERSION
	# Get the active git branch
	VERSION=$(shell ./server/scripts/version.sh)
endif

help:
	@echo "setup - Installs required python modules and node modules in docker volumes"
	@echo "run - Runs the app locally on docker compose"
	@echo "test-be - Runs server linting and tests"
	@echo "test-be - Runs client linting and tests"
	@echo "shell - Runs bash shell on server container"

SHELL := /bin/bash
COMPOSE = docker-compose
SERVER = server
CLIENT = client
WORKER = worker
PYENV = pyenv
DB = db
DB_SETUP = db-setup
COMPOSE_HTTP_TIMEOUT = 20000

build:
	$(COMPOSE) build

fixtures:
	$(COMPOSE) run $(SERVER) bash -c "python manage.py loaddata fixtures/default.json"

build-fe:
	$(COMPOSE) run $(CLIENT) bash -c "PROD_ENV=1 npm run build"

setup:
	make setup-be
	make fixtures
	make setup-fe

setup-be:
	$(COMPOSE) run ${SERVER} bash -c "pipenv install --system --deploy --dev"

setup-fe:
	$(COMPOSE) run ${CLIENT} bash -c "npm install"

setup-local:
	pipenv install

run:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) up

run-db:
	POSTGRES_USER=docker POSTGRES_PASSWORD=docker $(COMPOSE) run --service-ports $(DB)

run-be:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) run --service-ports $(SERVER) python manage.py runserver 0.0.0.0:8000

run-be-prod:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) run --service-ports $(SERVER) 

run-worker:
	$(COMPOSE) run $(WORKER)

run-fe:
	$(COMPOSE) run --service-ports  $(CLIENT)

run-prod:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) -f docker-production.yml up

dump-data:
	$(COMPOSE) run $(SERVER) bash -c "python manage.py dumpdata --natural-foreign --indent=4 -e contenttypes -e auth.Permission -e sessions -e wagtailcore.GroupCollectionPermission > fixtures/default.json"

test: test-be test-fe

lint-be:
	$(COMPOSE) $(SERVER) run $(SERVER) bash -c "find webapp -iname *.py | xargs pylint"

test:
	make test-be
	make test-fe

test-be:
	$(COMPOSE) $(SERVER) run $(SERVER) bash -c "pytest -s"

test-fe:
	$(COMPOSE) run $(CLIENT) npm run test

shell:
	$(COMPOSE) run --service-ports $(SERVER) bash

shell-fe:
	$(COMPOSE) run $(CLIENT) bash

shell-db:
	PGPASSWORD=docker psql -h localhost -U docker noelwilson2018

collect-static:
	$(COMPOSE) run $(SERVER) bash -c "rm -rf ./staticfiles/* && python manage.py collectstatic --no-input"

clean:
	find ./src/server -name \*.pyc -delete

deploy:
	make build-fe
	make collect-static


