data "aws_iam_user" "noelwilson2018" {
  user_name = "noelwilson2018"
}

resource "aws_iam_instance_profile" "noelwilson2018" {
  name = "noelwilson2018"
  role = "${aws_iam_role.jwnwilson.name}"
}

resource "aws_iam_role" "jwnwilson" {
  name = "jwnwilson"
  description = "Role for jwnwilson"
  assume_role_policy = "${data.aws_iam_policy_document.instance_assume_role.json}"
}

data "aws_iam_policy_document" "instance_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
