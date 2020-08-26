#!/bin/bash
# ====================================================================
# DEPLOYMENT SHELL SCRIPT
# ====================================================================
# Mayank Sharma - 22th August 2020
#
# This shell script installs docker, creates a docker network
# and either runs the docker container from the registry image
# or from local build.

echo "Deploying application ..."

stop_docker_container && remove_docker_container

remove_local_docker_image && remove_registry_docker_image

remove_docker_network

remove_old_docker && install_docker

create_docker_network

registry_build || local_build

echo "Application deployed ..."

# Removing old docker version
remove_old_docker()
{   
    sudo apt-get remove \
    docker \
    docker-engine \
    docker.io \
    containerd \
    runc -y
}

# Remove docker network ssq-paediatrics
remove_docker_network()
{
    docker network rm ssq-paediatrics
}

# Create docker network ssq-paediatrics
create_docker_network()
{
    docker network create -d bridge ssq-paediatrics
}

# Remove container
remove_docker_container()
{
    docker stop $(docker ps -q -f name=react-app)
}

# Stop already running container
stop_docker_container()
{
    docker rm $(docker ps -aq -f name=react-app)
}

# Remove docker images from local build
remove_local_docker_image()
{  
    docker rmi $(docker images paediatrics-ssq-client -q)
}

# Remove docker images from registry
remove_registry_docker_image() 
{
    docker rmi $(docker images docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client -q)
}

# Run only from registry
registry_build()
{
    docker_login && \
    docker_pull_image && \
    docker_run_registry_container
}

# Run only local build
local_build()
{
    docker_build_image && \
    docker_run_local_container
}

# Login to the GitHub registry
docker_login()
{
    docker login docker.pkg.github.com
}

# Pull docker image
docker_pull_image()
{   
    docker pull docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client:latest
}

# Run docker build
docker_build_image()
{
    docker build . -t paediatrics-ssq-client
}

# Run docker container from GitHub registry
docker_run_registry_container()
{
    docker run -d \
    -p 3000:3000 \
    --name react-app \
    --network ssq-paediatrics \
    docker.pkg.github.com/mayankshar21/swen90013-2020-ps/paediatrics-ssq-client
}

# Run docker container from local build
docker_run_local_container() 
{
    docker run -d \
    -p 3000:3000 \
    --name react-app \
    --network ssq-paediatrics \
    paediatrics-ssq-client
}

# Install docker-ce
install_docker()
{   
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
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo apt-key add -
        
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
    sudo apt-get install \
    docker-ce \
    docker-ce-cli \
    containerd.io -y
}
EOF