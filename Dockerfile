FROM node:stretch-slim

RUN mkdir /client

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY . /client

RUN apt-get update
RUN npm install
RUN npm audit fix

EXPOSE 3000

CMD ["npm", "start"]

