<h3 align="center">
🌐 INVENTORY - WEB APPLICATION
</h3>

![KOTA!](https://github.com/christiangubana/inventory-management/blob/main/inventory-app.png)

## Summary

This is a MERN (MongoDB, Express, React, Node.js) web application for managing inventory. The application includes authentication, CRUD operations for managing users and inventory items, and more.

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
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

### Docker

1. Build and start the Docker containers:

    ```sh
    cd inventory
    docker-compose up --build
    ```

You should see something like this in your docker Desktop

![DOCKER!](https://github.com/christiangubana/inventory-management/blob/main/docker-running-containers.png)

2. Open your browser and navigate to `http://localhost:3000`.


## Seeding the Database

To include initial test data (e.g., a test user and products), follow these instructions:

### Local

1. Create a file named `seed.js` in the `server` directory with the following content:

    ```javascript
    const mongoose = require("mongoose");
    const User = require("./models/user.model");
    const Food = require("./models/food.model");

    const seedData = async () => {
      const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/testingDb";
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "testingDb" });

      // Clear existing data
      await User.deleteMany({});
      await Food.deleteMany({});

      // Create a test user
      const user = new User({ username: "testuser", email: "testuser@example.com", password: "password" });
      await user.save();

      // Create some test food items
      const food1 = new Food({ title: "Apple", quantity: "10", description: "Fresh apples", image: "http://example.com/apple.jpg" });
      const food2 = new Food({ title: "Banana", quantity: "20", description: "Fresh bananas", image: "http://example.com/banana.jpg" });

      await food1.save();
      await food2.save();

      console.log("Seed data inserted");
      mongoose.disconnect();
    };

    seedData().catch(err => console.error(err));
    ```

2. Run the seed script:

    ```sh
    cd server
    node seed.js
    ```

