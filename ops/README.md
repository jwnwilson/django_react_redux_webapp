# Ops Setup

Before setting up install awscli with:

```
pip3 install awscli
```

Then login with:

```
aws configure
```

This setup requires a VPC with name="jwnwilson" and 2 subnets (different availablity zones) to be built manually before we can run packer or terraform commands.

To build EC2 AMI go to ./packer and run:

```
make server
```

To build the infrastructure go to ./terraform and run:

```
make plan
```

```
make apply
```
