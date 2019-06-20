data "aws_ecr_repository" "jwnwilson_server" {
  name = "jwnwilson_server"
}

data "aws_ecr_repository" "jwnwilson_worker" {
  name = "jwnwilson_worker"
}

data "aws_ecr_repository" "jwnwilson_ssr" {
  name = "jwnwilson_ssr"
}

data "aws_ecr_repository" "jwnwilson_nginx" {
  name = "jwnwilson_nginx"
}