#!/bin/bash
# ####################################################################
# DEPLOYMENT DOCKER FILE
# ####################################################################
# Mayank Sharma - 22th August 2020
#
# This docker file pulls a docker image from docker hub and builds a
# containerised react application from local files.

FROM node:14.8.0-stretch-slim

COPY . .

RUN apt-get update
RUN npm install
RUN npm install -g serve

RUN npm run build --production

EXPOSE 3000

CMD ["serve","-s","build","-l","3000"]
