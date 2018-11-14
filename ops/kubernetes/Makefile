dashboard:
	kubectl proxy &
	open http://localhost:8001/ui

kube-logs:
	kubectl logs -f ${POD}

kube-shell:
	kubectl exec -it ${POD} -c server -- /bin/bash

kube-node:
	kubectl describe node

# In order:
setup-gke-cluster:
	gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${ZONE} --project ${PROJECT}

kube-admin-bind:
	kubectl create clusterrolebinding cluster-admin-binding \
		--clusterrole cluster-admin --user $(gcloud config get-value account)

kube-db-credentials:
	kubectl create secret generic cloudsql-instance-credentials --from-file=/Users/noelwilson/Downloads/credentials.json

install_cert:
	kubectl create serviceaccount --namespace kube-system tiller
	helm init
	helm install --name cert-manager \
		--namespace kube-system \
		--set ingressShim.defaultIssuerName=letsencrypt-prod \
		--set ingressShim.defaultIssuerKind=ClusterIssuer \
		stable/cert-manager

kube-apply-all:
	kubectl apply -f .
