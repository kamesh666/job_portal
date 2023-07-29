# Use the official Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port on which your Node.js app listens
EXPOSE 3000

# Command to start your Node.js application
CMD ["node", "index.js"]
