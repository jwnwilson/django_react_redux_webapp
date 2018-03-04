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

COMPOSE = docker-compose
SERVER = server
CLIENT = client
PYENV = pyenv
DB = db
DB_SETUP = db-setup

build:
	$(COMPOSE) build

setup:
	$(COMPOSE) run ${PYENV}
	$(COMPOSE) run ${CLIENT} bash -c "npm install"

run:
	$(COMPOSE) up

run-db:
	$(COMPOSE) run --service-ports $(DB)

run-be:
	$(COMPOSE) run --service-ports $(SERVER)

run-fe:
	$(COMPOSE) run $(CLIENT)

run-fe-build:
		$(COMPOSE) run $(CLIENT) bash -c "PROD_ENV=1 ./node_modules/.bin/webpack"

data:
	$(COMPOSE) build --no-cache $(DB_SETUP)
	$(COMPOSE) run $(DB_SETUP)

test: test-be test-fe

test-be:
	$(COMPOSE) run $(SERVER) bash -c "./scripts/pylint.sh"
	$(COMPOSE) run $(SERVER) bash -c "./scripts/test.sh"

test-fe:
	$(COMPOSE) run $(CLIENT) npm test

shell:
	$(COMPOSE) run $(SERVER) bash

deploy:
	./ops/deploy.sh
