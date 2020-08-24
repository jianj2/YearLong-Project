#!/bin/bash

if [[ which docker && docker --version ]]; then
  echo "Run docker client"
  # command
else
  echo "Install docker"
  # command
fi