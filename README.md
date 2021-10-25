# my-notes-be

This is backend part of the "My notes" application.

## Tests

In order to run unit tests, please type:

```
npm run test
```

## Database

Database is created with MongoDB. In order to run database locally, you can either install
MongoDB on your machine or use Docker/Docker Compose (suggested solution).

### Docker

First, you need to create your local Docker network:
```dockerfile
docker network create mongo-net
```

Then start database by running this Docker command:
```dockerfile
docker run --rm \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -e MONGO_INITDB_DATABASE=my-notes \
  -p 27017:27017 \
  -v $PWD/mongodata:/data/db \
  -v $PWD/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
  --network mongo-net \
  --hostname mongo \
  --name mongo \
  mongo
```

If everything is ok, database will be available on your localhost:27017. 
Sample users will be already created in the database.

You can also run Docker monitor (Mongo Express) to see:
```dockerfile
docker run -it --rm \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
  -e ME_CONFIG_MONGODB_SERVER=mongo \
  -p 8081:8081 \
  --network mongo-net \
  --name mongo-express \
  --hostname mongo-express \
  mongo-express
```