# Utilise une image de base Ubuntu
FROM ubuntu:latest

# Met à jour les packages de base
RUN apt-get update && apt-get upgrade -y

ENV TZ=Europe/Paris

RUN apt-get -y install tzdata
# Installe PostgreSQL
RUN apt-get install postgresql -y

RUN apt-get 

# Définit l'utilisateur et le mot de passe par défaut pour PostgreSQL
ENV POSTGRES_USER tutorial
ENV POSTGRES_PASSWORD privatepassword

# Copie le script d'initialisation de PostgreSQL
COPY init-postgres.sh /docker-entrypoint-initdb.d/

# Expose les ports pour PostgreSQL et pgAdmin4
EXPOSE 5432

# Démarre PostgreSQL et pgAdmin4
CMD service postgresql start

FROM node:14

WORKDIR /app

COPY ./ ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]