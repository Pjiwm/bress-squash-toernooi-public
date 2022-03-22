# BressSquashToernooi
This is a copy of the original repository made for showcase only.
### Creators
https://github.com/16Maarten
https://github.com/pikuba
https://github.com/melvingiebels
https://github.com/Mo-Gal
https://github.com/TeaDrinkingProgrammer
https://github.com/Pjiwm
This project was generated using [Nx](https://nx.dev).

Check out the <a href="https://bress-squash-toernooi.herokuapp.com/api">API</a>

Check out the <a href="https://bress-squash-toernooi.web.app/">Web app</a>
<hr/>

# Index
1. [ Getting started ](#gettingStarted)

    1.1. [ Structure ](#projectStructure)
 
    1.2. [ Requirements ](#projectRequirements)
 
    1.3. [ Regular setup](#regularSetup)
 
    1.4. [ Docker setup](#dockerSetup)

    1.5. [ Usage ](#appUsage)
 
    1.6. [ Usage Angular](#usageAngular)
  
    1.7. [ Usage ExpressJS](#usageExpress)
  
2. [ Documentation details](#docDetails)

    2.1. [ UML diagram ](#docUML)
 
    2.2. [Use cases](#usecase)

    2.3. [ Data storage](#docData)
 
    2.4. [ Documentation diagrams](#docDiagrams)
  
    2.5. [ Queries ](#docQueries)

    2.6. [ Visualization ](#visuals)

    2.7. [Wireframes](#wireF)
 
    2.8. [Graphic-designs](#graphics)

3. [MoSCoW](#mos)

    3.1. [Must have](#must)
 
    3.2. [Should have](#should)
  
    3.3. [Could have](#could)
   
    3.4. [Would not have](#not)


<a name="gettingStarted"></a>
# Getting started
Installation guide and usage.

<a name="projectStructure"></a>
## Structure
Bress squash toernooi is a monorepo using NX with an Angular project for its frontend and an ExpressJS project written in TS as its backend
The monorepo also contains a `libs` folder which contains the models for the application.
The `libs` directory is a folder that can be used by all projects in the repository. 

<a name="projectRequirements"></a>
## Requirements
There's 2 options for installing the required software.

<a name="regularSetup"></a>
### Regular setup
To run the application successfully in a development environment you need to install a <a href="https://www.mongodb.com/try/download/community">mongoDB server</a>
and a <a href="https://neo4j.com/download-center/#community">Neo4j Server</a> 
Installing <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">Node<a/> is also required.
Simply run `npm i` to install the needed packages.
  
<a name="dockerSetup"></a>
### Docker setup
With docker no additional software needs to be installed all external software such as databases servers will run inside a docker image.
You do however need to configure a .env file on the root of your project to make the application connect through the docker database.
Inside the .env file add the following line:
```
MONGO_DATABASE_CONNECTION=mongodb://bress_mongo
```
To start up the application simply write `docker-compose build` in the command line followed by `docker-compose up` to start it up.
Alternatively you can use the remote container addon if you're using VScode in this case you don't need to run any commands at all, simply use the addon to open the docker-container as a remote container.
When the container starts up make sure to install the needed npm packages.
  
<a name="dotEnv"></a>
 ### .env file
 A .env file is needed to get some environment variables. The .env file should contain the following values:
 ```
JWT_SECRET=(request the JWT or generate a new random token)
MONGO_DATABASE_CONNECTION=mongodb://bress_mongo
ISSUER_BASE_URL=https://bress-squash-toernooi.eu.auth0.com
CLIENT_ID=ARwW2jWiJTqMjoJ9TeaoX1FKGfcQLzoW
BASE_URL=http://localhost:3000
NEO4J_URL='neo4j://127.0.0.1'
NEO4J_USER='neo4j'
NEO4J_PASSWORD='secret'
 ```
<a name="appUsage"></a>
## Usage
If you want to execute commands without having to write npx you can install:
`npm install -g nx`
  
<a name="usageAngular"></a>
### Frontend (Angular)
<a href="https://nx.dev/l/a/tutorial/01-create-application">more info</a>

run dev server: `npx nx serve frontend`

(if you use vscode you can use the launch.json by pressing f5)
  
build frontend: `npx nx build frontend`

generating a component: `npx nx g @nrwl/angular:component <name> --project frontend`

generating a service: `npx nx g @nrwl/angular:service <name> --project frontend`

<a name="usageExpress"></a>
### Backend (Express)
<a href="https://nx.dev/l/a/express/overview">more info</a>

run dev server: `npx nx serve backend`

build backend: `npx nx build backend`

build production: `npx nx build backend --configuration=production`

run tests: `npx nx test backend`
  
<a name="docDetails"></a>
# Documentation details
The documentation details contain diagrams for databases, deployment, structure, queries and mock designs.
  
<a name="docUML"></a>
## UML diagram
<img src="./documentation/uml/UMLDiagramBress.png?raw=true" width="50%" height="50%"/>
  
<a name="usecase"></a>
## Use cases
<img src="https://github.com/Pjiwm/bress-squash-toernooi/blob/main/documentation/use-cases/use-cases.png" width="50%" height="50%"/>

<a name="docData"></a>
## Data storage
### Databases
The application makes use of 3 databases in total, which are mongoDB Neo4j and a third party database from Auth0
Neo4j is used for most objects in the application, we use it for storing tournaments, games, game poules etc.
As seen in the ERD image
The Auth0 databse securily stores our users, it's a third party so we do not have direct access to their database, it only passes us the users we use.
With mongoDB we store a list of emails of Auth0 users that can use the system. There's a whitelist of emails from Auth0 user accounts that can use the application.
The 3 different databases can be seen together in the deployment diagram below.

<a name="docDiagrams"></a>
### Database diagrams

#### Deployment diagram
<img src="./documentation/erds/deploymentDiagramBress.png?raw=true" width="50%" height="50%">

#### Logical view
<img src="./documentation/erds/logicalViewBress.png?raw=true" width="50%" height="50%">
  
<a name="docQueries"></a>
### Queries

#### Commonly used queries
1 = almost never used, 2 = rarely used, 3 = commonly used, 4 = often used, 5 = used very often,
X = Unused, redundant  or non-existent

|               | POST          | GET  | PUT | DELETE |
| ------------- |:-------------:| :-----:|:-----:|-----:|
| /api/employee      | 1 | 1 | X|X|
| /api/employee/:id      | X | 3 | 1|1|
| /api/tournament     | 1 | 3 | X|X|
| /api/tournament/:id     | X | 5 | X|X|
| /api/division     | 1 | 4 | X|X|
| /api/division/:id     | X | 5 | X|X|
| /api/player     | X | 3 | X|X|
| /api/player/:id     | X | 5 | X|X|
| /api/division/:id/player     | 4 | 5 | X|X|
| /api/pool/:id     | X | 4 | X|X|
| /api/division/:id/pool     | 2 | 5 | X|X|
| /api/poolmatch/:id     | X | 4 | X|X|
| /api/pool/:id/poolmatch     | 4 | 5 | X|X|
| /api/komatch/:id     | X | 4 | X|X|
| /api/division/:id/komatch     | 2 | 5 | X|X|
| /api/set/:id     | X | 3 | X|X|
| /api/poolmatch/:id/set     | 4 | 4 | X|X|
| /api/komatch/:id/set     | 3 | 4 | X|X|
| /api/hall     | X | 3 | X|X|
| /api/hall/:id     | X | 3 | X|X|

Hall objects will remain the same and therefore do not have to be deleted and remain persisted in the database.
In most cases we do not need to remove objects at all, the entire database will be dropped between tournaments, because the data being stored becomes irrelevant after the tournament.
  
<a name="visuals"></a>
## Visualization
Visual representations for the web app.
 
<a name="wireF"></a>
### Wireframes
Wireframes can be found <a href="./documentation/wireframes">here</a>
  
<a name="graphics"></a>
### Graphic-designs

#### Planning
<img src="./documentation/graphic-design/Planning.png?raw=true" width="50%" height="50%">

#### Tourney overview
<img src="./documentation/graphic-design/Toernooien%20overzicht.png?raw=true" width="50%" height="50%">
  
#### Match overview
  <img src="https://github.com/Pjiwm/bress-squash-toernooi/blob/main/documentation/graphic-design/Wedstrijd-overzicht.png" width="50%" height="50%">
  
<a name="mos"></a>
## MoSCoW
  
 <a name="must"></a>
### Must have:
-	As a player, I want the bracket I am playing against next to be done approximately when I am done, so that I do not have to wait a long time. 
-	As a player, I want the final of the advanced players to be in the bar room, so I can enjoy a pint while watching it.
-	As an employee, I want to be able to generate tournament brackets so I don't have to do it by hand.
-	As a user I want to add players to a squash tournament so they can participate in the competition.
-	As an employee I want my tournament bracket to be as small possible, so the tournament doesn't take too long
-	As an employee I want to categorize players in different tournaments 
-	As an employee I want to edit the player list last minute before the tournament starts, so I can handle with unexpected situations
  
 <a name="should"></a>
Should have:
-	As a player, I want to be able to see how the tournament is organised, so I know against whom I am playing and how the tournament is getting along.
 
 <a name="could"></a>
### Could have:
-	As a user I want to add the score/result from played matches.

 <a name="not"></a>
### Would not have:
-	Export results from tournament to an excell sheet. 
<hr/>  
  For specific files please use the <a href="./documentation">Documentation<a/> directory.
