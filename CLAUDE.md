# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docker learning project. As files and examples are added, update this file to reflect the actual structure and commands used.

## Common Commands

### Docker Basics
```powershell
# Build an image from a Dockerfile in the current directory
docker build -t <image-name> .

# Run a container
docker run -p <host-port>:<container-port> <image-name>

# Run interactively with a shell
docker run -it <image-name> /bin/sh

# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop <container-id>

# Remove a container
docker rm <container-id>

# Remove an image
docker rmi <image-name>
```

### Docker Compose
```powershell
# Start all services defined in docker-compose.yml
docker compose up

# Start in detached mode (background)
docker compose up -d

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs
docker compose logs -f

# Rebuild images before starting
docker compose up --build
```

### Useful Debugging
```powershell
# Open a shell inside a running container
docker exec -it <container-id> /bin/sh

# View container logs
docker logs <container-id>

# Inspect container details (networking, mounts, env vars)
docker inspect <container-id>

# Show resource usage
docker stats
```

## Environment

- Platform: Windows 11, PowerShell
- Use PowerShell syntax for all shell commands in this project
- Docker Desktop for Windows should be running before using any docker commands
