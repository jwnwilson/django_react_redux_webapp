data "aws_vpc" "jwnwilson" {
  filter {
    name = "tag:Name"
    values = ["jwnwilson"]
  }
}

data "aws_subnet_ids" "jwnwilson" {
  vpc_id = "${data.aws_vpc.jwnwilson.id}"
}

# data "aws_route_table" "jwnwilson" {
#   vpc_id = "${data.aws_vpc.jwnwilson.id}"
#   filter {
#     name = "tag:Explicitly Associated with"
#     values = [${data.aws_subnet_ids.jwnwilson.id}]
#   }
# }

data "aws_availability_zones" "available" {
}

data "aws_security_group" "jwnwilson" {
  name = "jwnwilson"
}

# data "aws_route53_zone" "jwnwilson" {
#   name = "noel-wilson.co.uk."
# }

# data "aws_iam_role" "jwnwilson" {
#   name = "noel-wilson.co.uk"
# }
