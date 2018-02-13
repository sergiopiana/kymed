FROM node:8.9.3-alpine

# Set a working directory
WORKDIR /usr/src/app

#COPY ./build/package.json .
COPY ./ .

# Install Node.js dependencies
RUN yarn install

# Copy application files
#COPY ./build .

# Run the container under "node" user by default
USER node

#CMD [ "node", "server.js" ]

CMD [ "yarn", "start" ]

