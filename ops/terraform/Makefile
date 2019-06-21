include ../../.env
include ../../web.env
include ./env.mk


init:
	terraform init

plan: init
	terraform plan --out ${PLAN}

apply: init
	terraform apply ${PLAN}

destroy: init
	terraform destroy
