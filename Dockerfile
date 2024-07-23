FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY . .
RUN npm run build


CMD [ "node", "./dist/main.js" ]

