<h3 align="center">
🌐 INVENTORY - WEB APPLICATION
</h3>

![KOTA!](https://github.com/christiangubana/inventory-management/blob/main/inventory-app.png)

## Summary
A full stack application, tailored to facilitate a chef(working in a Kota shop) in managing food items by providing features such as adding, updating, and deleting them. The app uses Authentication with JSON Web Tokens (JWTs) user encryption.

<p>Step-by-step guide on how to get this application up and running on your local machine</p>

## clone or download
```terminal
$ git clone https://github.com/christiangubana/inventory-management.git
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json

   -------------------
   
   └── inventory-management/
    ├── .github/
    │   └── workflows/
    │       └── pipeline.yml
    ├── client/
    ├── server/
    └── docker-compose.yml
...
```


## Usage (run full-stack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^20.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client // go to client folder
$ npm i // npm install packages
$ npm run dev // run it locally
```

## Server-side usage(PORT: 4000)

### Prepare the connection with MongoDB

#### IMPORTANT NOTE 
This project required a mongoDB connection setup. Setup the connection based on the environments below.
```local development: add your mongodb atlast URL inside the db.config.js file in the config folder, which exports your db uri connection. An example is provided(mongodb://localhost:27017), config/db.config.js.```

### Start

```terminal
// in the root level
$ cd server
$ npm i // npm install packages
$ npm start or nodemon main // run it locally
```

## How to run the app on Docker Container

First you need to have Docker Desktop intalled on your local machine & make sure you have the right DB connection & the server 
You will notice inside the server folder, check inside inside index.js file you'll see how I switch connections:

### See example below
```terminal
// in the root level
$ cd server
$ find the 'index.js' file
mongoose.connect(uri,{
// mongoose.connect('mongodb://mongo:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},6000000)
}

mongodb://mongo:27017 = is my mongo image, refer this from 'docker-compose.yml' file
uri = is the value of my MONGODB_URI variable stored inside .env file
...
```

```terminal
$ cd inventory-management // go to the main folder
$ docker-compose up --build    // to build/start both the client & the server images


# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^1.6.8 | bcryptjs": "^2.4.3
chart.js": "^3.1.0 |cors": "^2.8.5
react: "^18.2.0 | dotenv": "^16.4.5
react: ^16.2.0 | express": "^4.18.3
react-chartjs-2: "^3.0.0 | express-unless": "^2.1.3
react-dom: "^18.2.0 | jsonwebtoken": "^9.0.2
react-router-dom: ^6.22.3 | mongoose": "^8.2.2
react-toastify": ^10.0.52 | mongoose-unique-validator": "^5.0.0
react-dom: "^18.2.0 | multer": "^1.4.5-lts.1

## Tool used

Language: 
 └── client side: JavaScription, React.js TailwindCSS
 └── server side: Node.JS, Express.JS, MongoDB, Multer(for image upload)

IDE: Visual Studio

OS: Windows 11 Pro 64-bit


### License
[MIT](https://github.com/christiangubana/inventory-management/LICENSE)
