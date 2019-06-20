resource "aws_db_subnet_group" "jwnwilson" {
  name = "jwnwilson"
  subnet_ids = "${data.aws_subnet_ids.jwnwilson.ids}"
}

resource "aws_db_parameter_group" "jwnwilson" {
  name = "jwnwilson"
  family = "postgres10"

  parameter {
    name = "shared_preload_libraries"
    value = "pg_stat_statements"
    apply_method = "pending-reboot"
  }

  parameter {
    name = "pg_stat_statements.max"
    value = "10000"
    apply_method = "pending-reboot"
  }

  parameter {
    name = "pg_stat_statements.track"
    value = "all"
    apply_method = "pending-reboot"
  }

  parameter {
    name = "log_statement"
    value = "all"
    apply_method = "pending-reboot"
  }

  parameter {
    name = "log_min_duration_statement"
    value = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name  = "max_connections"
    # value = "LEAST({DBInstanceClassMemory/9531392},5000)"
    value = "500"
    apply_method = "pending-reboot"
  }
}

resource "aws_db_instance" "jwnwilson" {
  identifier = "jwnwilson"

  allocated_storage = "${var.db_allocated_storage}"
  storage_type = "${var.db_storage_type}"
  engine = "postgres"
  engine_version = "${var.db_postgres_version}"
  instance_class = "db.t2.micro"
  username = "${var.postgres_username}"
  password = "${var.postgres_password}"
  db_subnet_group_name = "${aws_db_subnet_group.jwnwilson.name}"
  vpc_security_group_ids = ["${aws_security_group.jwnwilson_db.id}"]
  parameter_group_name = "${aws_db_parameter_group.jwnwilson.name}"
  apply_immediately = true

  final_snapshot_identifier = "jwnwilson"
  skip_final_snapshot = true // can't delete without this
  multi_az = true
  backup_retention_period = 30 // days
  backup_window = "00:00-01:00"
}

resource "aws_security_group" "jwnwilson_db" {
  name = "db.noel_wilson.co.uk"
  vpc_id = "${data.aws_vpc.jwnwilson.id}"
}

resource "aws_security_group_rule" "jwnwilson_db" {
  type = "ingress"
  from_port = 5432
  to_port = 5432
  protocol = "tcp"
  security_group_id = "${aws_security_group.jwnwilson_db.id}"
  source_security_group_id = "${aws_security_group.jwnwilson.id}"
}

output "jwnwilson_db_endpoint" {
  value = "${aws_db_instance.jwnwilson.address}"
}
