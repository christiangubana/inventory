# Use Node.js LTS version as base image
FROM node:lts-alpine as build

# Set working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Production environment
FROM node:lts-alpine

# Set working directory to serve the app
WORKDIR /app/client

# Install serve to run the app
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/client/build ./build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build"]
