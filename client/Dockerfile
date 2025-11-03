# Build stage
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the React app
RUN npm run build

# Production stage with nginx
FROM --platform=linux/arm64 nginx:alpine

# Copy the built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]