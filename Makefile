.EXPORT_ALL_VARIABLES:

-include .env
-include web.env

ifndef VERSION
	# Get the active git branch
	VERSION=$(shell cat VERSION)
endif

help:
	@echo "setup - Installs required python modules and node modules in docker volumes"
	@echo "run - Runs the app locally on docker compose"
	@echo "test-be - Runs server linting and tests"
	@echo "test-be - Runs client linting and tests"
	@echo "shell - Runs bash shell on server container"

SHELL := /bin/bash
DOCKER_REPO = 675468650888.dkr.ecr.eu-west-1.amazonaws.com
COMPOSE = docker-compose
SERVER = server
CLIENT = client
WORKER = worker
CACHE = redis
SSR = ssr
NGINX = nginx
PYENV = pyenv
DB = db
DB_SETUP = db-setup
COMPOSE_HTTP_TIMEOUT = 20000
SSH = ubuntu@$(EC2_URL)

fixtures:
	$(COMPOSE) run --no-deps $(SERVER) bash -c "python manage.py migrate && python manage.py loaddata fixtures/default.json"

build-fe:
	$(COMPOSE) run $(CLIENT) bash -c "PROD_ENV=1 npm run build"

setup: setup-network setup-be setup-fe setup-ssr fixtures collect-static
	echo "Setup complete"

setup-network:
	docker network create -d bridge --subnet 192.168.0.0/24 --gateway 192.168.0.10 ssr

setup-be:
	$(COMPOSE) run --no-deps ${SERVER} bash -c "pipenv install --system --dev"

setup-fe:
	$(COMPOSE) run ${CLIENT} bash -c "npm install"

setup-ssr:
	$(COMPOSE) run --no-deps ${SSR} bash -c "npm install"

setup-local:
	pipenv install

setup-nginx:
	$(COMPOSE) run --no-deps --service-ports $(NGINX) bash -c "certbot certonly --standalone -d test.noel-wilson.co.uk"

daemons:
	$(COMPOSE) up -d --no-deps $(WORKER) $(DB) $(CACHE) $(SSR)

setup-prod: setup-be setup-fe setup-ssr setup-nginx collect-static
	echo "Setup complete"

up:
	ENV=prod COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) up --no-deps -d $(SERVER) $(CACHE) $(NGINX)

run:
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) up --no-deps $(SERVER) $(WORKER) $(DB) $(CACHE) $(SSR)

run-db:
	POSTGRES_USER=docker POSTGRES_PASSWORD=docker $(COMPOSE) run --service-ports $(DB)

run-be: daemons
	COMPOSE_HTTP_TIMEOUT=$(COMPOSE_HTTP_TIMEOUT) $(COMPOSE) run --service-ports $(SERVER) python manage.py runserver 0.0.0.0:8000

run-ssr:
	$(COMPOSE) up -d --no-deps $(SSR)

run-worker:
	$(COMPOSE) up -d --no-deps $(WORKER)

run-fe:
	$(COMPOSE) run --service-ports  $(CLIENT)

dump-data:
	$(COMPOSE) run --no-deps $(SERVER) bash -c "python manage.py dumpdata --natural-foreign --indent=4 -e contenttypes -e auth.Permission -e sessions -e wagtailcore.GroupCollectionPermission > fixtures/default.json"

test: test-be test-fe

lint-be:
	$(COMPOSE) run $(SERVER) bash -c "find webapp -iname *.py | xargs pylint"

test-be:
	$(COMPOSE) run $(SERVER) bash -c "pytest -s"

test-fe:
	$(COMPOSE) run $(CLIENT) npm run test

shell:
	$(COMPOSE) run --no-deps $(SERVER) bash

shell-fe:
	$(COMPOSE) run $(CLIENT) bash

shell-db:
	PGPASSWORD=docker psql -h localhost -U docker noelwilson2018

shell-nginx:
	$(COMPOSE) run --no-deps $(NGINX) bash

collect-static:
	$(COMPOSE) run --no-deps $(SERVER) bash -c "rm -rf ./staticfiles/* && python manage.py collectstatic --no-input"

clean:
	find ./src/server -name \*.pyc -delete

deploy-heroku: build-fe collect-static
	git commit --allow-empty -m "Deploying to heroku"
	git push heroku HEAD:master

deploy: docker_build docker_push
	ssh -i ./ops/data/jwnwilson.pem $(SSH) "cd /app && ./ops/deploy.sh"

docker_login:
	eval $(shell aws ecr get-login --region eu-west-1 --no-include-email)

docker_build:
	$(COMPOSE) rm -f
	$(COMPOSE) build

docker_pull: docker_login
	$(COMPOSE) pull

docker_push: docker_login
	docker push $(DOCKER_REPO)/jwnwilson_nginx:$(VERSION)
	docker push $(DOCKER_REPO)/jwnwilson_server:$(VERSION)
	docker push $(DOCKER_REPO)/jwnwilson_ssr:$(VERSION)

docker_stop:
	docker stop $(shell docker ps -q)

down:
	$(COMPOSE) down

down-ssr-worker:
	$(COMPOSE) stop ssr worker

prerender: run-ssr run-worker
	# Run make run before this
	$(COMPOSE) run --no-deps  $(SERVER) bash -c "python manage.py prerender"
	sleep 120s
	$(MAKE) down-ssr-worker
