# Kubernetes GKE instructions

1. Create cluster (I did it manually)
2. Connect clsuter to kubectl:

    $ gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PRO
    JECT

3. Assign cluster role binding to noel-wilson:

    $ make kube-admin-bind

4. Install dashboard:

    $ kubectl apply -f ops/kubernetes/dashboard.yaml
    $ make dashboard

5. Create / Install secrets / service account (Not stored here in private google drive)

    $ kubectl create secret generic cloudsql-instance-credentials \
        --from-file=credentials.json=/credentials.json
    $ kubectl apply -f ops/kubernetes/secrets.yaml

6. Install remaining kubernetes .yaml files

