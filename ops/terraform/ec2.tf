resource "aws_key_pair" "deploy" {
  key_name   = "deploy"
  public_key = "${file("../data/jwnwilson.pub")}"
}

data "aws_subnet" "jwnwilson" {
  vpc_id = "${data.aws_vpc.jwnwilson.id}"
  filter {
    name = "tag:Name"
    values = ["jwnwilson-eu-west-1c"]
  }
}

resource "aws_ebs_volume" "jwnwilson_server" {
    availability_zone = "eu-west-1c"
    size = 16
    tags = {
        Name = "jwnwilson_server"
    }
}

resource "aws_volume_attachment" "jwnwilson_server" {
  device_name = "/dev/sdj"
  volume_id   = "${aws_ebs_volume.jwnwilson_server.id}"
  instance_id = "${aws_instance.jwnwilson.id}"
}

resource "aws_security_group" "jwnwilson" {
  name = "jwnwilson.noel_wilson.co.uk"
  vpc_id = "${data.aws_vpc.jwnwilson.id}"
}

resource "aws_security_group_rule" "jwnwilson_ingress_http" {
  type = "ingress"
  from_port = 80
  to_port = 80
  protocol = "tcp"
  security_group_id = "${aws_security_group.jwnwilson.id}"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "jwnwilson_ingress_https" {
  type = "ingress"
  from_port = 443
  to_port = 443
  protocol = "tcp"
  security_group_id = "${aws_security_group.jwnwilson.id}"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "jwnwilson_ssh" {
  type = "ingress"
  from_port = 22
  to_port = 22
  protocol = "tcp"
  security_group_id = "${aws_security_group.jwnwilson.id}"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "jwnwilson_egress" {
  type = "egress"
  from_port = 0
  to_port = 0
  protocol = "-1"
  security_group_id = "${aws_security_group.jwnwilson.id}"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_instance" "jwnwilson" {
  ami = "${var.jwnwilson_ami}"
  instance_type = "t2.micro"
  associate_public_ip_address = true
  subnet_id = "${data.aws_subnet.jwnwilson.id}"
  vpc_security_group_ids = ["${aws_security_group.jwnwilson.id}"]
  key_name = "${aws_key_pair.deploy.key_name}"
  iam_instance_profile = "${aws_iam_instance_profile.noelwilson2018.name}"

  tags = {
    Name = "jwnwilson"
  }
}