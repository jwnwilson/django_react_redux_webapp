resource "aws_vpc" "jwnwilson" {
  cidr_block       = "10.0.0.0/16"
  tags = {
    Name = "jwnwilson"
  }
}

resource "aws_subnet" "jwnwilson" {
  vpc_id     = "${aws_vpc.jwnwilson.id}"
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "jwnwilson"
  }
}

data "aws_subnet_ids" "jwnwilson" {
  vpc_id = "${aws_vpc.jwnwilson.id}"
}


data "aws_route_table" "noel_wilson" {
  filter {
    name = "tag:Name"
    values = ["noel_wilson.co.uk"]
  }
}

data "aws_availability_zones" "available" {
}

data "aws_security_group" "jwnwilson_nodes" {
  name = "nodes.noel-wilson.co.uk"
}

data "aws_route53_zone" "jwnwilson" {
  name = "noel-wilson.co.uk."
}

data "aws_iam_role" "jwnwilson_node" {
  name = "nodes.noel-wilson.co.uk"
}
