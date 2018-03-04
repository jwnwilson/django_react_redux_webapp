#! /bin/bash

DB_HOST=${DB_HOST:-}

echo "Clearing nw_db"
if [[ -z "$DB_HOST" ]]; then
  mongo nw_db --eval "db.dropDatabase();"
else
  mongo nw_db --host $DB_HOST --eval "db.dropDatabase();"
fi
echo "Cleared nw_db"

colls=( projects pages hobbies blog )

for c in ${colls[@]}
do
  if [[ -z "$DB_HOST" ]]; then
    mongoimport -d nw_db --collection $c --type json --file server/db/data/$c.json --jsonArray
  else
    mongoimport --host $DB_HOST -d nw_db --collection $c --type json --file server/db/data/$c.json --jsonArray
  fi
  sleep 2
done

echo "Reloaded data"
