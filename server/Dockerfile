# Use Node.js for ARM64 (M3 Mac compatible)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --legacy-peer-deps

# Copy the rest of the server files
COPY . .

# Expose backend port
EXPOSE 5001

# Start the server
CMD ["node", "server.js"]
