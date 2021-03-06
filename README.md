# Außerordentliche Mäuse

## Running the NodeJS Server
To run the Node JS Server you need to have Node JS installed!

To install the dependencies of the App run:
> npm install

To Start the Server run:
> npm start

now the Server should be reachable under:
> http://localhost:8080

## Running the Node JS Site in Docker
This Repository has a ready Dockerfile, so that you can build the Container yourself.
### Building the Container
This step is only necessary if you really want to build the Container yourself. If you just want to use the Container you can use the prebuild image.

First clone the Repository
> git clone https://github.com/Bytecm/ausserordentliche_maeuse.git

Go into the Repository
> cd ausserordentliche_maeuse

Then Build the Docker Container (use "sudo" if you are on Linux)
> docker build -t bytecm/ausserordentliche_maeuse .

### Running the Container
This repository gives you two Options the classic "docker run" command and docker-compose
The default port is: 8080/tcp

#### Docker run
When you want to use the classic "docker run" use this Commands:

##### starting self build image:
> docker run -d -p 8080:8080 --name ausserordentliche_maeuse bytecm/ausserordentliche_maeuse

##### starting prebuild image:
> docker run -d -p 8080:8080 --name ausserordentliche_maeuse ghcr.io/bytecm/ausserordentliche_maeuse:main

##### stopping:
> docker stop ausserordentliche_maeuse
 
#### deleting: 
> docker rm ausserordentliche_maeuse

#### docker-compose
When you want to use docker-compose just type in the repository folder, or just download the docker-compose.yml:

##### starting:
> docker-compose up -d

##### stopping:
> docker-compose down