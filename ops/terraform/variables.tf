# set through TF_VARs in Makefile -----------------

variable "region" {}

variable "postgres_username" {}

variable "postgres_password" {}

# -------------------------------------------------

variable "db_postgres_version" {
  default = "10.6"
  description = "Postgres version used across DB instances."
}

variable "db_storage_type" {
  default = "gp2"
  description = "Disk Storage Type, must be the same across DB instances."
}

variable "db_allocated_storage" {
  default = 20
  description = "Disk size, must be the same across DB instances."
}

variable "jwnwilson_ami" {
  default = "ami-075610ebc86d2b4e3"
  description = "AMI for running docker containers"
}
