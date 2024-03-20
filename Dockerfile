# Base image
FROM node:18-alpine as development

RUN addgroup app && adduser -S -G app app

USER app

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm ci

EXPOSE 3000




# # Creates a "dist" folder with the production build
# RUN npm run build

# # Start the server using the production build
 CMD [ "npm" , "run" , "start" ]
