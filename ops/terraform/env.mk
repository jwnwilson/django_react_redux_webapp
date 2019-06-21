export TF_VAR_region="eu-west-1"

export TF_VAR_postgres_username=postgres
export TF_VAR_postgres_password=${POSTGRES_PASS_PROD}

PLAN=.terraform/plan
