#! /bin/bash
PROJECT_ID=jwnwilson-eu
SERVER_IP="138.68.150.137"
TODAY=$(date +"%m_%d_%Y")

# Build static files
make build && make setup && make run-fe-build
echo "Built static files"

# Copy project to server
zip -r /tmp/project.zip ./server ./static -x ./server/venv/**\* ./server/.cov/**\* ./server/.cache/**\*
scp /tmp/project.zip root@${SERVER_IP}:/tmp/project.zip
ssh root@${SERVER_IP} "unzip /tmp/project.zip -d /opt/app/noelwilson_${TODAY}"
ssh root@${SERVER_IP} "rm /opt/app/current && ln -s /opt/app/noelwilson_${TODAY} /opt/app/current"
echo "Copied files to remote machine"

# Copy nginx conf
scp ./ops/noelwilson.conf root@${SERVER_IP}:/etc/nginx/sites-enabled/noelwilson.conf
scp ./ops/jwnwilson.conf root@${SERVER_IP}:/etc/nginx/sites-enabled/jwnwilson.conf
# Copy supervisor conf
scp ./ops/supervisor.conf root@${SERVER_IP}:/etc/supervisor/conf.d/noelwilson.conf
echo "Copied nginx and supervisor conf to remote machine"

# Restart processes
ssh root@${SERVER_IP} "supervisorctl stop all"
ssh root@${SERVER_IP} 'docker stop $(docker ps -a -q)'
ssh root@${SERVER_IP} "cd /opt/app/current/ && make data"

ssh root@${SERVER_IP} "supervisorctl restart all"
ssh root@${SERVER_IP} "systemctl restart nginx"
echo "Restarted processes"
