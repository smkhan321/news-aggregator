# React Vite Project Docker Setup

This repository contains a React project built using Vite and Dockerized for easy deployment. The following instructions will guide you on how to build and run the application using Docker.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)

## Getting Started

Follow these steps to build and run the Docker container for your React Vite application.

### 1. Build the Docker Image

First, you need to build the Docker image. Run the following command in the root of the project directory (where your `Dockerfile` is located):

```bash
 docker build -t news-app
 ```

### 2.  Run the Docker Container

Once the Docker image is built, you can run the container using the following command:

```bash
docker run -p 80:80 news-app
```
