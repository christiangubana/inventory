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
    git clone https://github.com/your-username/mern-inventory.git
    cd mern-inventory
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
    npm start
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
    docker-compose up --build
    ```

2. Open your browser and navigate to `http://localhost:3000`.


