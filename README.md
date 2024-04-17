<h1 align="center">
🌐 INVENTORY MANAGEMENT - WEB APPLICATION
</h1>

## Summary

<p>Step-by-step guide on how to get this application up and running on your local machine</p>

## clone or download
```terminal
$ git clone https://github.com/christiangubana/inventory-management.git
$ npm i
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

# Usage (run fullstack app on your machine)

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

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 4000)

### Prepare the connection with MongoDB

#### IMPORTANT NOTE 
This project required a mongoDB connection setup. Setup the connection based on the environments below.
```local development: add your mongodb atlast URL inside the db.config.js file in the config folder, which exports your db.uri connection. An example is provided(mongodb://localhost:27017), config/db.config.js.```

### Start

```terminal
// in the root level
$ cd server
$ npm i    // npm install packages
$ npm start or nodemon main // run it locally
```


## Deploy Server to [Heroku](https://dashboard.heroku.com/)
```terminal
$ npm i -g heroku
$ heroku login
...
$ heroku create
$ npm run heroku:add <your-super-amazing-heroku-app>
// remember to run this command in the root level, not the server level, so if you follow the documentation along, you may need to do `cd ..`
$ pwd
/Users/<your-name>/mern
$ npm run deploy:heroku
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
