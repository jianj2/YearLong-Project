FROM node:14.8.0-stretch-slim

COPY . .

RUN apt-get update
RUN npm install
RUN npm install -g serve

RUN npm run build --production

EXPOSE 3000

CMD ["serve","-s","build"]
