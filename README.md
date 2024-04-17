<h1 align="center">
🌐 INVENTORY MANAGEMENT - WEB APPLICATION
</h1>

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
...
```

# Usage (run full-stack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^20.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ npm i    // npm install packages
$ npm run dev        // run it locally
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
$ npm i    // npm install packages
$ npm start or nodemon main // run it locally
```

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


### License
[MIT](https://github.com/christiangubana/inventory-management/LICENSE)
