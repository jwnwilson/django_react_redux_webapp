cd /app
git reset --hard
git pull
make docker_pull
make setup-network
make setup-prod
make down up
make prerender