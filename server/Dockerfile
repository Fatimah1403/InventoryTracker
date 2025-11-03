# Use Node.js for ARM64 (M3 Mac)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all server files
COPY . .

# Expose the port
EXPOSE 5001

# Start the server
CMD ["node", "server.js"]