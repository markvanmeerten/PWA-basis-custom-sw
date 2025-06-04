FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Install static server + concurrently
RUN npm install -g serve concurrently

# Expose Vite's dev port or the serve port
EXPOSE 4173

# Chokidar needs a shell type
ENV SHELL=/bin/sh

# Run build watcher AND static file server concurrently
#CMD ["npx", "concurrently", "npm:build:watch", "npm:serve:dist"]
CMD ["npm", "run", "pwa"]