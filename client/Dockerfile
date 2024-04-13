# Use Node.js LTS version as base image
FROM node:lts-alpine as build

# Set the working directory in the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm config set legacy-peer-deps true
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose a port to communicate with the React app
EXPOSE 5173

# Start your React app
CMD ["npm", "run", "dev"]