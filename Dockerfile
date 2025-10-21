# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Create .next directory for development
RUN mkdir -p .next

# Expose port
EXPOSE 3000

# Install curl for health checks
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Run the development server
CMD ["npm", "run", "dev"]