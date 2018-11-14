# Kubernetes GKE instructions

## Kubernetes TO DO

- Automate entire setup

### Postgres setup notes

- Needed to add proxy container to server containers to connect to RDS (container added in server.yaml)
- Add postgres instance
- Create database
- Add current user to postgres instance with postgres user
- Grant permissions to new user to access database
- Run migration on DB from server container

## Kubernetes setup notes:

1. Create cluster (I did it manually)
2. Connect clsuter to kubectl:

    $ gcloud container clusters get-credentials $CLUSTER_NAME --zone $ZONE --project $PRO
    JECT

3. Assign cluster role binding to noel-wilson:

    (Copy paste command doesn't work from make command)
    $ make kube-admin-bind

4. Install dashboard:

    $ kubectl apply -f ops/kubernetes/dashboard.yaml
    $ make dashboard

5. Create service account

    $ kubectl create secret generic cloudsql-instance-credentials \
        --from-file=credentials.json=/credentials.json
    or 

    $ make kube-db-credentials

6. Copy secrets.yaml (Not stored here in private google drive)

    https://drive.google.com/drive/folders/1qhal6R_rWe4HYJHEdnRJjZ1Zw8ovEDbU

6. Install remaining kubernetes .yaml files

    $ kube-apply-all
