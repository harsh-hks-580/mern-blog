FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your backend runs on
EXPOSE 4000

# Command to run your backend
CMD ["node", "index.js"]
