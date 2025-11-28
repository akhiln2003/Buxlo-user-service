# User Service

This service manages user-related data and actions for the BUXLO application. It handles user profiles, settings, and other user-specific information. It uses MongoDB for data storage and communicates with other services via Kafka and gRPC.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [gRPC Services](#grpc-services)
- [Kafka Integration](#kafka-integration)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (v18)
- npm
- MongoDB
- Redis
- Kafka
- AWS S3 Bucket

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/akhiln2003/Buxlo-user-service.git
   ```
2. Navigate to the `user` directory:
   ```bash
   cd Microservices/user
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the service in development mode, run:

```bash
npm start
```

This will start the server using `tsx`.

## Environment Variables

This service requires the following environment variables to be set. You can create a `.env` file in the root of the `user` directory and add the following:

| Variable                          | Description                               | Example / Default                                                                         |
| --------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `PORT`                            | The port the service will run on.         | `4002`                                                                                    |
| `REDIS_URL`                       | The connection URL for Redis.             | `redis://redis:6379`                                                                      |
| `GRPC_PORT`                       | The port for the gRPC server.             | `50051`                                                                                   |
| `GRPC_PAYMENT_PORT`               | The port for the payment gRPC service.    | `50053`                                                                                   |
| `KAFKA_CLIENT_ID`                 | The client ID for Kafka.                  | `user-service`                                                                            |
| `KAFKA_BROKER`                    | The Kafka broker address.                 | `kafka:9092`                                                                              |
| `KAFKA_GROUP_ID`                  | The Kafka group ID.                       | `user-group`                                                                              |
| `MONGODB_URI`                     | The connection URI for the MongoDB database. | `mongodb+srv://<user>:<password>@buxlo.../User`                                          |
| `AWS_S3_BUCKET_NAME`              | The name of the AWS S3 bucket.            | `buxlo-bucket`                                                                            |
| `AWS_S3_BUCKET_REGION`            | The region of the AWS S3 bucket.          | `eu-north-1`                                                                              |
| `AWS_S3_BUCKET_ACCESS_KEY`        | The access key for the AWS S3 bucket.     | `REDACTED — set in .env`                                                                  |
| `AWS_S3_BUCKET_SECRET_ACCESS_KEY` | The secret access key for the AWS S3 bucket. | `REDACTED — set in .env`                                                               |
| `EMAIL_USER`                      | The username for the email service.       | `buxlofinance@gmail.com`                                                                  |
| `EMAIL_PASS`                      | The password for the email service.       | `REDACTED — set in .env`                                                                  |


<!-- ## API Endpoints

This service exposes RESTful endpoints for managing users.
*(Detailed documentation of the API endpoints should be added here)* -->

## gRPC Services

This service exposes a gRPC server and consumes the payment gRPC service.

## Kafka Integration

This service uses Kafka for asynchronous communication. It acts as a producer and consumer.

<!-- ## Running Tests

There are no test scripts configured for this service yet. -->

## Deployment

This service can be containerized using Docker. A `Dockerfile` is provided in the root of the `user` directory.

To build the Docker image:

```bash
docker build -t user-service .
```

To run the Docker container:

```bash
docker run -p 4002:4002 user-service
```