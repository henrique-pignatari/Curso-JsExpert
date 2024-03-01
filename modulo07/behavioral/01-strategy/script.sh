sudo docker run \
--name postgres \
-e POSTGRES_USER=henrique \
-e POSTGRES_PASSWORD="senha123" \
-e POSTGRES_DB=heroes \
-p 5432:5432 \
-d \
postgres

sudo docker logs postgres
sudo docker exec -it postgres psql --username henrique --dbname heroes

CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
SELECT * FROM warriors;

sudo docker run \
--name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=henrique \
-e MONGO_INITDB_ROOT_PASSWORD=senha123 \
-p 27017:27017 \
-d \
mongo:4

sudo docker logs mongodb