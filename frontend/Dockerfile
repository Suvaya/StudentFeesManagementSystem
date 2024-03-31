# Use the official Node.js 14 image as a parent image
FROM node

# Set the working directory in the container
WORKDIR /src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install node modules and dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
