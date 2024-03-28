# Use the official Node.js Alpine image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Start the application
CMD ["npm", "start"]