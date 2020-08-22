FROM node:stretch-slim

COPY . .

RUN apt-get update
RUN npm install
RUN npm install -g serve

RUN npm run build --production

EXPOSE 5000

CMD ["serve","-s","build"]
