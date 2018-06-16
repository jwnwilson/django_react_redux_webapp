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
PYENV = pyenv
DB = db
DB_SETUP = db-setup
COMPOSE_HTTP_TIMEOUT = 2000

build:
	$(COMPOSE) build

build-prod:
	$(COMPOSE) -f docker-production.yml build

build-fe:
	$(COMPOSE) run $(CLIENT) bash -c "PROD_ENV=1 npm run build"

setup:
	$(COMPOSE) run ${PYENV}
	$(COMPOSE) run ${CLIENT} bash -c "npm install"

setup-local:
	python3 -m venv ./src/server/venv && source ./src/server/venv/bin/activate

run:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) up

run-db:
	POSTGRES_USER=docker POSTGRES_PASSWORD=docker $(COMPOSE) run --service-ports $(DB)

run-be:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) run --service-ports $(SERVER)

run-fe:
	$(COMPOSE) run --service-ports  $(CLIENT)

run-prod:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) -f docker-production.yml up

test: test-be test-fe

test-be:
	$(COMPOSE) run $(SERVER) bash -c "./scripts/pylint.sh"
	$(COMPOSE) run $(SERVER) bash -c "./scripts/test.sh"

test-fe:
	$(COMPOSE) run $(CLIENT) npm test

shell:
	$(COMPOSE) run $(SERVER) bash

shell-fe:
	$(COMPOSE) run $(CLIENT) bash

shell-db:
	PGPASSWORD=docker psql -h localhost -U docker noelwilson2018

collect-static:
	$(COMPOSE) run $(SERVER) bash -c "rm -rf ./staticfiles/* && python manage.py collectstatic --no-input"

deploy:
	make build-fe
	make collect-static
	git commit -am "Updating FE for deployment"
	git push heroku master
