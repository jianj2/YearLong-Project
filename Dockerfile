FROM node:stretch-slim

COPY . .

RUN npm install

RUN npm run build --production

EXPOSE 5000

CMD ["serve","-s","build"]
