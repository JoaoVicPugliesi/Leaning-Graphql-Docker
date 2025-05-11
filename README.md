### Learning Graphql, Docker and Redis as my DB

Learning a new API paradigm while using Redis as my main DB. Also applying Docker.

### Running Program On Basic Manner

Well... all you need is:

1 - Open Terminal and run command git clone https://github.com/JoaoVicPugliesi/Leaning-Graphql-Docker.git

2 - Run command cd graphql

3 - Run command code . or find folder location and drag it into your code editor

4 - Open terminal and run npm install

5 - Add a .env file inside your workspace and add 5 variables... 

REST_PORT=8000

REST_HOST='0.0.0.0'

GRAPHQL_PORT=4000

GRAPHQL_HOST='0.0.0.0'

REDIS_URL='redis://localhost:6379'


6 - Run npm run dev and go inside http://localhost:4000 where you'll find the graphql sandbox to test it out

7 - Also you can run npm run test to see the tests running and all jest coverage

### Running Program On Docker Manner

1 - Simply install docker desktop and run docker --version if you don't have already installed

2 - Go to docker hub and find johnpugliesi/car-webservice

3 - run command docker pull johnpugliesi/car-webservice:latest and docker pull redis:latest

4 - run command docker images to see if you have the project imagejohnpugliesi/car-webservice inside your images

5 - create a directory to run the project, open it, create a docker-compose.yml file and add it 

services:
  webservice: 
  
    image: johnpugliesi/car-webservice

    container_name: car-webservice

    ports:

      - '8000:8000'

      - '4000:4000'

    depends_on:

      - redisservice

    networks:

      - api-network

    env_file:

      - .env


  redisservice:

    image: redis

    container_name: redis-webservice

    ports:

      - '6379:6379'

    networks:

      - api-network

networks:

  api-network:

    driver: bridge

6 - run docker-compose -p car-shop up

7 - try access localhost:4000

8 - if successful you can test it out