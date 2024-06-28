<h3 align="center">
🌐 INVENTORY - WEB APPLICATION
</h3>

![KOTA!](https://github.com/christiangubana/inventory-management/blob/main/inventory-app.png)

## Summary

This is a Full-Stack MERN(MongoDB,Express.js,React.js,Node.js) web application facilitating superusers to manage inventory items.

This `README.md` file provides a comprehensive guide for setting up and running your MERN web application both locally and with Docker, including necessary prerequisites, environment variables, and instructions for running the application.

## Project Structure

```plaintext
inventory/
├── .github/
│   └── workflows/
│       └── pipeline.yml
├── client/
│   ├── public/
│   └── src/
├── server/
│   ├── controllers/
│   ├── database/
│   │   └── connect.js
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js
└── docker-compose.yml
```

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Local](#local)
  - [Docker](#docker)
- [Seeding the Database](#seeding-the-database)
  - [Local](#local-1)
  - [Docker](#docker-1)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (register, login)
- CRUD operations for inventory items
- Responsive UI with React
- RESTful API with Express
- MongoDB for data storage
- JSON Web Token (JWT)
- Graph/Chart to dynamically Indicat inventory levels
  
## Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- MongoDB (for local setup)
- Docker and Docker Compose (for Docker setup)

## Installation

### Local Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/christiangubana/inventory.git
    cd inventory
    ```

2. Install dependencies for both the client and server:

    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Set up your MongoDB database and ensure it's running. For local development, MongoDB should be running on `mongodb://localhost:27017`.

4. Create a `.env` file in the `server` directory with the following content:

    ```env
    MONGODB_URI=mongodb://localhost:27017/testingDb
    PORT=8080
    ```

### Docker Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/christiangubana/inventory.git
    cd inventory
    ```

2. Build and start the Docker containers:

    ```sh
    cd inventory
    docker-compose up --build
    ```

## Environment Variables

The application requires the following environment variables:

- `MONGODB_URI`: The MongoDB connection string (e.g., `mongodb://localhost:27017/testingDb` for local development).
- `PORT`: The port on which the server will run (default is `8080`).

## Running the Application

### Local

1. Make sure MongoDB is running locally.

2. Start the server:

    ```sh
    cd server
    nodemon or npm start
    ```

3. Start the client:

    ```sh
    cd client
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

### Docker

1. Build and start the Docker containers:

    ```sh
    cd inventory
    docker-compose up --build
    ```
This command will build and start the frontend, backend, and MongoDB services. The backend service will automatically seed the database if the `seed.js` file is present.

You should see something like this in your docker Desktop

![DOCKER!](https://github.com/christiangubana/inventory-management/blob/main/docker-running-containers.png)

2. Open your browser and navigate to `http://localhost:3000`.


## Seeding the Database

To include initial test data (e.g., a test user and products), follow these instructions:

### Local

1. Create a file named `seed.js` in the `server` directory with the following content:

    ```javascript
        const mongoose = require('mongoose');
        const User = require('./models/user.model');
        const Food = require('./models/food.model');
        const bcrypt = require('bcryptjs');

        const seedData = async () => {
        const uri = process.env.MONGODB_URI || "mongodb://mongo:27017/testingDb";
        await mongoose.connect(uri, {
        // useNewUrlParser and useUnifiedTopology are deprecated in newer versions of mongoose
        });

        // Clear existing data
        await User.deleteMany({});
        await Food.deleteMany({});

        // Create a test user
        const salt = bcrypt.genSaltSync(10);
        const testUser = new User({
            username: 'testuser',
            email: 'testuser@example.com',
            password: bcrypt.hashSync('password', salt),
        });
        await testUser.save();

        // Create some test food items
        const foods = [
            { title: 'Apple', quantity: '10', description: 'Fresh apples', image: 'http://example.com/apple.jpg' },
            { title: 'Banana', quantity: '6', description: 'Fresh bananas', image: 'http://example.com/banana.jpg' },
        ];

        for (const food of foods) {
            const foodItem = new Food(food);
            await foodItem.save();
        }

        console.log('Seed data inserted');
        mongoose.disconnect();
        };

        seedData().catch(err => console.error(err));

2. Build and start the Docker containers, which will automatically run the seed script:

   ```sh
    cd inventory
    docker-compose down
    docker-compose up --build
    ```

The backend service will run the `seed.js` script if it exists and then start the application.

## License

This project is licensed under the [ MIT License](https://github.com/christiangubana/rest-api.git)
