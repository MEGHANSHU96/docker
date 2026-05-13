# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo is a Docker learning project built around **tikkle** — a React 19 + Vite 8 + Tailwind CSS 4 e-commerce fashion storefront. The app lives in `tikkle/` and is containerized via a multi-stage Dockerfile (Node build → nginx serve). CI/CD uses Azure Pipelines to push the image to Docker Hub (`meghanshu0/tikkle-app`).

## App Architecture

The frontend is a pure client-side SPA with no backend:

- **Routing** — React Router DOM v7; routes defined in `tikkle/src/App.jsx`
- **State** — Cart state managed via React Context + `useReducer` in `tikkle/src/context/CartContext.jsx`; exposes `addItem`, `removeItem`, `updateQty`, `clearCart`, `totalItems`, `totalPrice`
- **Data** — Static product catalog in `tikkle/src/data/products.js`; cart items are keyed by `(id, selectedSize)` pairs
- **Styling** — Tailwind CSS v4 (Vite plugin, no config file)

Pages: `Home`, `Shop`, `ProductDetail` (`/product/:id`), `Cart`, `About`, `Contact`

## Development Commands

All commands run from inside `tikkle/`:

```powershell
cd tikkle
npm install        # install dependencies
npm run dev        # start Vite dev server (HMR)
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # run ESLint
```

## Docker Workflow (tikkle app)

```powershell
# Build the image from the tikkle directory
docker build -t tikkle-app ./tikkle

# Run locally on port 8080
docker run -p 8080:80 tikkle-app

# Open shell in running container
docker exec -it <container-id> /bin/sh
```

The Dockerfile uses a two-stage build: Node 20 Alpine compiles the Vite app, then nginx:alpine serves the `dist/` output. `tikkle/nginx.conf` configures SPA fallback (`try_files $uri $uri/ /index.html`) so client-side routes work correctly.

## CI/CD — Azure Pipelines

`azure-pipelines.yml` triggers on pushes to `main` and:
1. Logs in to Docker Hub using the `mydocker` service connection
2. Builds the image tagged with `$(Build.BuildId)` and `latest`
3. Pushes both tags to `meghanshu0/tikkle-app`

The Docker context for the pipeline build is `$(Build.SourcesDirectory)/tikkle` with the Dockerfile at `tikkle/Dockerfile`.

## General Docker Reference

```powershell
docker ps                          # running containers
docker ps -a                       # all containers
docker stop <container-id>
docker rm <container-id>
docker rmi <image-name>
docker logs <container-id>
docker inspect <container-id>      # networking, mounts, env vars
docker stats                       # resource usage
```

## Environment

- Platform: Windows 11, PowerShell
- Docker Desktop for Windows must be running before any `docker` commands
