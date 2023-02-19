# Utilise une image de base Ubuntu
FROM ubuntu:latest

# Met à jour les packages de base
RUN apt-get update && apt-get upgrade -y

ENV TZ=Europe/Paris

RUN apt-get -y install tzdata
# Installe PostgreSQL
RUN apt-get install postgresql -y

# Définit l'utilisateur et le mot de passe par défaut pour PostgreSQL
ENV POSTGRES_USER tutorial
ENV POSTGRES_PASSWORD privatepassword

# Copie le script d'initialisation de PostgreSQL
COPY init-postgres.sh /docker-entrypoint-initdb.d/

# Installe pgAdmin4
RUN apt-get install -y wget gnupg2
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update && apt-get install -y pgadmin4

# Expose les ports pour PostgreSQL et pgAdmin4
EXPOSE 5432
EXPOSE 80

# Démarre PostgreSQL et pgAdmin4
CMD service postgresql start && /usr/pgadmin4/bin/pgAdmin4