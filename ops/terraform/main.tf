terraform {
  required_version = "0.12.2"

  backend "s3" {
    bucket = "jwnwilson-terraform"
    key = "terraform.tfstate"
    region = "eu-west-1"
  }
}

provider "aws" {
 # credentials provided from ~/.aws/credentials
  region = "eu-west-1"
  version = "2.7.0"
}
