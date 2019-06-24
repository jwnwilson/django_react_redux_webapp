-include ../.env

pub-key:
	ssh-keygen -y -f ./data/jwnwilson.pem > ./data/jwnwilson.pub

ssh:
	ssh -i ./data/jwnwilson.pem ubuntu@$(EC2_URL)