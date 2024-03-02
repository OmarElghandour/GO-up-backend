# pull node image from docker hub
FROM node:alpine

# set working directory
WORKDIR '/app'

# copy files to working directory
COPY package.json .

# install dependencies
RUN npm install

# create user
RUN chown -R node.node /app

COPY . .

CMD ["npm", "run", "dev"]

