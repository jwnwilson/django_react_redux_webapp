#! /bin/sh

gcloud auth login
gcloud config set project noelwilson-2018

# Create users / volumes / services / deployments
kubectl create -f ./ops/kubernetes

# setup dashboard
# kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml

# Get Token for login
# kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
# kubectl proxy
# http://localhost:8001/ui

# Deploy to GKE cluster via kubernetes

# If we need to amend the kubernetes cluster settings
# kompose convert -f docker-production.yml -o ops/kubernetes/

# Remove existing services
# kompose down -f docker-production.yml
# kompose up -f docker-production.yml

# Expose nginx
# kubectl expose deployment nginx --type=LoadBalancer --name=load-balancer
