#!/bin/bash

echo "Deployment process initiated ..."

# Check if docker exists
if [ $(which docker) && $(sudo docker --version) ]; then
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
    software-properties-common -y
    
    # Add Docker’s official GPG key
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    
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
if [ $(sudo docker ps -q -f name=react-app) ]; then
    sudo docker stop $(sudo docker ps -q -f name=react-app)
    echo "container stopped ..."
    sudo docker rm $(sudo docker ps -aq -f name=react-app)
    echo "container removed ..."
else
    echo "No such containers exist ..."
fi

# Remove docker images from registry
if [ $(sudo docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q) ]; then
    sudo docker rmi $(sudo docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q)
    echo "Registry image removed ..."
else
    echo "Registry image does not exist ..."
fi

# Remove docker images from local build
if [ $(sudo docker images paediatrics-ssq-client -q) ]; then
    sudo docker rmi $(sudo docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q)
    echo "Local image removed ..."
else
    echo "Local image does not exist ..."
fi

# create docker network 
if [ $(sudo docker network ls -f name=ssq-paediatrics) ]; then
    echo "Docker network ssq-paediatrics exists ..."
else
    echo "Creating network ..."
    sudo docker network create -d bridge ssq-paediatrics
fi

result=$(sudo docker pull docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client:latest)
# Pull from github registry to run image
if [ $result = *"latest: Pulling from"* ]; then
    echo "Image pulled ..."
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