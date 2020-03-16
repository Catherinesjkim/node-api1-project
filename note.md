## Node.js: A way to run JS outside of the web browser

- A platform to build a network of applications, web API, real time chat app, etc
- Nice to build web APIs
- What is an API? Application Programming Interface. Interface that sits in between 2 systems
- Server in the BE and Client: API lives in the server 
- HTTP API sends data via JSON over the wire
- How a client connects through the internet, through the info we have in the server
- Server: there are resources and the client needs endpoints to access them. endpoint = url
- Building an API is pretty complex, so we use Express for server side/NodeJS 
- It's like React for BE. For client, we use React 

- RESTful API: resources/endpoints - Lesson & Hub
- Feature 1: add a new lesson, view a list of existing lessons, etc 
- Feature 2: add a new hub, view a list of existing hubs, etc 

## A table of the `endpoint` descriptions

{id}: dynamic id that's going to change later

| Action                 | URL               | Method        | Response
| :-----------------------------------------------------------------------------
| Add a Lesson           | /api/lessons      | POST          | the new Lesson
| View list of Lessons   | /api/lessons      | GET           | array of Lessons
| View Lesson detils     | /api/lessons/{id} | GET           | a Lesson
| Update Lesson          | /api/lessons/{id} | PATCH/PUT     | updated Lesson
| Remove a Lesson        | /api/lessons/{id} | DELETE        | deleted Lesson
| :-----------------------------------------------------------------------------
| Add a Hub              | /api/hubs         | POST          | the new Hub         
| View list of Hubs      | /api/hubs         | GET           | array of hubs
| View Hub details       | /api/hubs/{id}    | GET           | a Hub
| Update Hub             | /api/hubs/{id}    | PATCH/PUT     | updated Hub
| Remove a Hub           | /api/hubs/{id}    | DELETE        | deleted Hub


## Add this to .gitignore

npx gitignore node

# Mac Files

.DS_Store

npm init -y

npm i express 

## to run the server use: node index.js

npm i -D nodemon 
installs "devDependencides": { "nodemon": latest version } to package.json
scripts will say start