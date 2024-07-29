FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

EXPOSE 3000

# Start the web server
CMD ["npm", "start"]
