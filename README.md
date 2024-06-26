## INSTALLATION

First step is to convert all the env.example files to .env files.
Every service has it's own .env file, and the .env.example file is located in the root of the service directory.
```terminal
cp .env.example .env
```

## ENV FILES
Every service has its own env.example file. 
You will have to copy that file into an .env file. 
```terminal
 cp .env.example .env
```
## DOCKER
To set up the environment, you will need to first install [Docker](https://docs.docker.com/engine/install/).
Navigate to the project directory and run:

```terminal
docker compose up
```
To bring up the services. 
You will see the pino logs starting to appear.
This will stand up the services, You will see the pino logs starting to appear.
## TESTS
Run the tests with the following command:
The tests that fail are the ones not implemented yet.  
```terminal
pnpm run test
```

## PROGRAMMING LANGUAGE 
 - Typescript

## Running the app
>make sure that you have docker installed in order to spin op all the services.
Each service should have it's .env.sample file that you need to convert into .env files.  Add the ports that you want each service to have.
Note:
auth, roles, permissions each have tcp ports for internal communication, since roles, and permissions supply proper authorizatino, and auth supplies authentication.
--
>

## Setting Up MongoDB For Local Development (MAC OS & Linux)
>See this DOC FILE for more info FIRST: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
Enter the following commands in the terminal:
```bash
brew tap mongodb/brew
brew update
brew install mongodb-community
```
#### NOTE:
the mongod.conf file may have different locations depending on your OS.
#### MAC OS INTEL PROCESSOR:
- conf file location: `/usr/local/etc/mongod.conf`
- log directory location: `/usr/local/var/log/mongodb`
- data directory location: `/usr/local/var/mongodb`

#### MAC OS SILICON PROCESSOR:
- conf file location: `/opt/homebrew/etc/mongod.conf`
- log directory location: `/opt/homebrew/var/log/mongodb`
- data directory location: `/opt/homebrew/var/mongodb`

#### WHEN YOU HAVE INSTALLED MONGODB:
##### Create the following bash method in your .bash_profile file:
```bash
function mongo() {
  if [ $# -eq 0 ]; then
      echo "Opening MongoDB Service Client ..."
      brew services start mongodb-community

      echo  "Verifying that MongoDB has started successfully ... "
      ps aux | grep -v grep | grep mongod
  fi
  if [ "$1" = "--restart" ]; then
    echo "Restarting the mongodb service ..."
    brew services restart mongodb-services
  fi  
  if [ "$1" = "--stop" ]; then
    echo "Stopping MongoDB Service ..."
    brew services stop mongodb-community
  fi  
}
```
> open your conf file with nano, vim, or code,
```bash
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1, ::1
  ipv6: true
```

#### TELL MONGOD WHERE TO STORE DATA:
Note the location of the log file and associate it with the mongod executable.
```bash
mongod --dbpath /usr/local/var/mongodb
```

#### connect mongo shell ( MONGOSH ) to your local MongoDB instance:
```bash
mongosh "mongodb://127.0.0.1:12027/database_name"
```
#### KEEP MongoDB and MONGOSH updated:
```bash
brew update
brew upgrade mongodb-community
brew upgrade mongosh
```

## PROGRAMMING LANGUAGE 
 - Typescript

## POSTMAN Collection
Is located in the `libs/src` directory. 

Every microservice has its own PORT & TCP PORT. 
Here they are listed
- AUTH SERVICE: 3200
- LOCATION SERVICE: 3350
- LOGGED TIME SERVICE: 4400
- TASKS SERVICE: 3400
- WORKER SERVICE: 3100

Each respective service has an `api` global prefix configured in its main.ts file,

## SERVICE URLS:
- AUTH SERVICE: http://localhost:3200/api
- LOCATION SERVICE: http://localhost:3350/api
- LOGGED TIME SERVICE: http://localhost:4400/api
- TASKS SERVICE: http://localhost:3400/api
- WORKER SERVICE: http://localhost:3100/api

## SWAGGER DOCS
- AUTH SERVICE : http://localhost:3200/api/swagger/docs
- LOCATION SERVICE : http://localhost:3350/api/swagger/docs
- LOGGED TIME SERVICE : http://localhost:4400/api/swagger/docs
- TASKS SERVICE : http://localhost:3400/api/swagger/docs
- WORKER SERVICE : http://localhost:3100/api/swagger/docs

## MONGODB
We are using the Mongodb Data store to store and manipulate the data.
This is a global module that is accessible to every service, and this is configured within 
each service's module.ts file.

## Global PINO HTTP LOGGER
THis is configured within each service' module.ts file.

## MICROSERVICE ARTCHITECTURE & FEATURES
- Custom authentication guards.  Can authenticate a route in a matter of seconds.
- Microservices in a monorepo with global shared resources
- Microservices communicate via TCP
- SOLID principle methodology
- Using custom authentication guards for authorization & authentication
- API DESIGN Follows open api specification
- Authenticated user can transact these queries per the JwtAuthGuard

### Globally available resources:
1.  PINO HTTP LOGGER
2.  response Serializer ( can be understood by AWS Cloudwatch )
3.  Mongodb Data store
4.  Authentication Guard
5.  Response interceptor ( formats the responses into a data property, and outputs API current version )
6.  Global API prefix on API calls
7.  Swagger doc generator
8. Custom API version reader that is diplayed by the response interceptor, and swagger docs
9. Global directory aliases that allows us to write elegant paths in imports.
For example, instead of writing ; 
```typescript
import { AuthService } from '../../../auth/auth.service';
````
We can write:
```typescript
import { AuthService } from '@auth/auth.service';
````
### NICE TO HAVES (If time would have permitted ):
- Create buildspec for deploying microservices into AWS ECR repositories.
- Kubernetes deployment configurations 
- Jest Tests
- Customized logger for production, and development ( development uses pino-pretty )
- Database migration configuration

### TYPICAL PARAMETERS PASS TO THE AGGREGATED QUERIES
```terminal
locationIds:65f779ac7056875318f35df5
includeCompleted:false
workerIds:65f8a856867b4bab8ab29f88,65f9f93cc17f352415384d64,65f779ac7056875318f35dfb
```
