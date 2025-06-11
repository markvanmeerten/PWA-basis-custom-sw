FROM node:18

# Maak een folder aan in de container
WORKDIR /app

# Kopieer de package file naar de container
COPY package.json package-lock.json ./
# Installeer alle node_modules
RUN npm install

# Kopieer de rest van de applicatie code naar de container
COPY . .

# Start dev server
CMD ["npm", "run", "dev"]