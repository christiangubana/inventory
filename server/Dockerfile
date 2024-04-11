# Use Node.js LTS version as base image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
