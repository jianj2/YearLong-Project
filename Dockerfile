#!/bin/bash
# ####################################################################
# DEPLOYMENT DOCKER FILE
# ####################################################################
# Mayank Sharma - 22th August 2020
#
# This docker file pulls a docker image from docker hub and builds a
# containerised node application from local files.

FROM node:stretch-slim

RUN mkdir /server

WORKDIR /server

COPY . /server

RUN apt-get update
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]

