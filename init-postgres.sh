#!/bin/bash
set -e

# Création de la base de données
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE mydatabase;
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO $POSTGRES_USER;
EOSQL

# Création d'un utilisateur
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" mydatabase <<-EOSQL
    CREATE USER myuser WITH PASSWORD 'mypassword';
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
EOSQL