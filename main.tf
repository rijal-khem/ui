
terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.0"
    }
  }

}

#Configure the aws provider

provider "aws" {
  profile    = "default"
  region     = "us-east-1"
  access_key = "AKIA5ZWBFLZ2VE3O277Z"
  secret_key = "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"

}

#Create Vpc
resource "aws_vpc" "vpc-rizal" {
  instance_tenancy = "default"
  cidr_block       = "10.0.0.0/16"

  tags = {
    Name = "vpc-rizal"
  }
}



#Create Internet Gateway
resource "aws_internet_gateway" "internet-gateway-rizal" {
  vpc_id = aws_vpc.vpc-rizal.id

  tags = {
    Name = "Internet-Gateway"
  }
}


#Create Route - Table

resource "aws_route_table" "routeTable_rizal" {
  vpc_id = aws_vpc.vpc-rizal.id

  #routing ipv4 connecction to internate gateway
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet-gateway-rizal.id
  }


  route {
    ipv6_cidr_block = "::0/0"
    gateway_id = aws_internet_gateway.internet-gateway-rizal.id
  }

  tags = {
    Name = "Route-Table"
  }
}

resource "aws_subnet" "public-subnet-rizal-1a" {
  vpc_id = aws_vpc.vpc-rizal.id
  cidr_block = "10.0.0.0/25"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  enable_resource_name_dns_a_record_on_launch = true

}


resource "aws_subnet" "public-subnet-rizal-1b" {
  vpc_id = aws_vpc.vpc-rizal.id
  cidr_block = "10.0.0.128/25"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true

}

resource "aws_main_route_table_association" "association" {
  route_table_id = aws_route_table.routeTable_rizal.id
  vpc_id         = aws_vpc.vpc-rizal.id
}


resource "aws_security_group" "sshAccess" {
  name = "allow_ssh"
  vpc_id = aws_vpc.vpc-rizal.id

  ingress {
    from_port = 22
    protocol  = "tcp"
    to_port   = 22
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::0/0"]
  }

  tags = {
    Name = "allow_ssh"
  }

}

resource "aws_security_group" "allow-http" {
  vpc_id = aws_vpc.vpc-rizal.id
  name = "allow_http_80"
  ingress {
    from_port = 80
    protocol  = "tcp"
    to_port   = 80
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::0/0"]
  }

  egress {
    from_port = 0
    protocol  = "-1"
    to_port   = 0
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::0/0"]
  }

  tags = {
    Name = "allow_tcp"
  }
}



#Create EC2 instance
resource "aws_instance" "ec2_ui" {
  ami           = "ami-007855ac798b5175e"
  instance_type = "t2.micro"
  subnet_id = aws_subnet.public-subnet-rizal-1a.id
  availability_zone = "us-east-1a"
  associate_public_ip_address = true
  key_name = "masterConnectKey"
  security_groups = [aws_security_group.sshAccess.id,aws_security_group.allow-http.id]
  user_data = <<-EOL
  #!/bin/bash -xe
  sudo apt update
  sudo apt install nodejs -y
  sudo apt install nginx -y
  EOL

  tags = {
    Name = "ui-webserver"
  }

}

resource "aws_alb" "ui-alb" {
  name = "ui-alb"
  internal = false
  security_groups = [aws_security_group.allow-http.id ]
  subnets = [aws_subnet.public-subnet-rizal-1a.id,aws_subnet.public-subnet-rizal-1b.id]
  ip_address_type = "ipv4"
  tags = {
    Name = "ui-load-balancer"
  }
}

resource "aws_alb_target_group" "ui-target" {
  name = "ui"
  target_type = "instance"
  protocol = "HTTP"
  port = 80
  vpc_id = aws_vpc.vpc-rizal.id

}

resource "aws_alb_listener" "ui-listener" {
  load_balancer_arn = aws_alb.ui-alb.arn
  protocol = "HTTP"
  port = 80
  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.ui-target.arn
  }
}



resource "aws_alb_target_group_attachment" "target-attachment" {
  target_group_arn = aws_alb_target_group.ui-target.arn
  target_id        = aws_instance.ec2_ui.id
}

resource "aws_route53_record" "ui-route" {
  zone_id = "Z053866414RT3Y4S9O0BH"
  name    = "www.rizzal.com"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.ec2_ui.public_ip]
}


