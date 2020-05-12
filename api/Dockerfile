FROM node:alpine

# Create app directory
WORKDIR /var/www/app

# Copy app source to work directory
COPY . /var/www/app

# Install dependencies
RUN npm install

# run the app
CMD npm run start:dev