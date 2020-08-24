#!/bin/bash

echo "Deployment process initiated ..."

# Check if docker exists
if [[ which docker && docker --version ]]; then
    echo "Docker installed ..."
else
    echo "Installing docker ..."
    # Removing old versions 
    sudo apt-get remove docker docker-engine docker.io containerd runc
    
    # Updating the repository
    sudo apt-get update
    
    # Installing packages
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
    
    # Add Docker’s official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    
    # Verifying key with fingerprint
    sudo apt-key fingerprint 0EBFCD88

    # Adding stable repository
    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

    # Update the repository
    sudo apt-get update

    # Install latest version of docker
    sudo apt-get install docker-ce docker-ce-cli containerd.io
fi

# Remove already running container
if [[ sudo docker ps -q -f name=react-app ]]; then
    sudo docker stop $(docker ps -q -f name=react-app)
    echo "container stopped ..."
    sudo docker rm $(docker ps -aq -f name=react-app)
    echo "container removed ..."
fi

# Remove docker images from registry
if [[ sudo docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q]]; then
    sudo docker rmi $(docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q)
    echo "Image removed ..."
fi

# Remove docker images from local build
if [[ sudo docker images paediatrics-ssq-client -q]]; then
    sudo docker rmi $(docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q)
    echo "Image removed ..."
fi

# create docker network 
if [[ sudo docker network ls -f name=ssq-paediatrics ]]; then
    echo "Docker network ssq-paediatrics exists ..."
else
    echo "Creating network ..."
    sudo docker network create -d bridge ssq-paediatrics
fi

# login into github registry to pull image
if [[ sudo docker login docker.pkg.github.com ]]; then
    echo "Logged in ..."
    # Run docker run ...
    sudo docker run -d docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client \
    -p 5000:5000 \
    --name react-app \
    --network ssq-paediatrics
    echo "react-app running on port 5000 ..."
# else build from files
else
    echo "Building from files ..." 
    # Run docker build ...
    sudo docker build . -t paediatrics-ssq-client
    # Run docker run ...
    sudo docker run -d paediatrics-ssq-client \
    -p 5000:5000 \
    --name react-app \
    --network ssq-paediatrics
    echo "react-app running on port 5000 ..."
fi