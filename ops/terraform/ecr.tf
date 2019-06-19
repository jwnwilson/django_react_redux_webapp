resource "aws_ecr_repository" "jwnwilson_server" {
  name = "jwnwilson_server"
}

resource "aws_ecr_repository" "jwnwilson_worker" {
  name = "jwnwilson_worker"
}

resource "aws_ecr_repository" "jwnwilson_ssr" {
  name = "jwnwilson_ssr"
}