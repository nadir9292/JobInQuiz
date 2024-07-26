FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

COPY . .
# Install dependencies
RUN npm install

RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]