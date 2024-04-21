# Base image
FROM node:18 as development

# RUN addgroup app && adduser -S -G app app

# USER app

# Create app directory
WORKDIR /app

COPY package.json .

# Install app dependencies
RUN npm i --force

# Bundle app source
COPY . .



EXPOSE 3000




# # Creates a "dist" folder with the production build
# RUN npm run build

# # Start the server using the production build
 CMD [ "npm" , "run" , "start" ]
