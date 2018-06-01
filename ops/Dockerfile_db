FROM library/postgres
ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB noelwilson2018
ENV PGDATA /var/lib/postgresql/data/db-files/
COPY ./ops/init.sql /docker-entrypoint-initdb.d/
