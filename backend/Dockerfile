# Use the official Node.js 14 image as a parent image
FROM node

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install node modules and dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "server.js" ]
