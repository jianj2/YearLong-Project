FROM node:stretch-slim

RUN mkdir /server

WORKDIR /server

COPY . /server

RUN apt-get update
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]

