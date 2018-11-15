CLUSTER_NAME=noel-wilson-cluster
ZONE=europe-west1-b
PROJECT=noelwilson-2018

dashboard:
	kubectl proxy &
	open http://localhost:8001/ui

kube-logs:
	kubectl logs -f ${POD}

kube-shell:
	kubectl exec -it ${POD} -c server -- /bin/bash

kube-node:
	kubectl describe node

# Connect to cluster
connect:
	gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${ZONE} --project ${PROJECT}

# Bind current user to cluster admin role
kube-admin-bind:
	kubectl create clusterrolebinding cluster-admin-binding \
		--clusterrole cluster-admin --user $(gcloud config get-value account)

# Upload service account credentials to allow RDS access
kube-db-credentials:
	kubectl create secret generic cloudsql-instance-credentials --from-file=/Users/noelwilson/Downloads/credentials.json

# Install cert manager which will generate a ssl cert for endpoints
install_cert:
	kubectl apply -f tiller-role.yaml
	helm init
	helm install --name cert-manager \
		--namespace kube-system \
		--set ingressShim.defaultIssuerName=letsencrypt-prod \
		--set ingressShim.defaultIssuerKind=ClusterIssuer \
		stable/cert-manager

# Install data / services
kube-apply-all:
	kubectl apply -f .
