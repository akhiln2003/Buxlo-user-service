# BUXLO User Service

The **BUXLO User Service** manages user accounts, mentor profiles, mentorship matches, client-mentor feedback, ratings, and profile media (using AWS S3 + Sharp). It exposes gRPC endpoints to verify user scopes and sync levels with the auth/payment microservices.

---

## 🛠️ Technology Stack

- **Runtime**: [Node.js](https://nodejs.org/) (TypeScript)
- **Web Framework**: [Express](https://expressjs.com/)
- **Data Persistence**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (resizing profiles) & [Multer](https://github.com/expressjs/multer) (upload middleware)
- **Shared Package**: `@buxlo/common`
- **RPC Framework**: [gRPC Node](https://grpc.io/docs/languages/node/) (runs servers on ports `50051` and `50053`)
- **Message Broker**: [Apache Kafka](https://kafka.apache.org/) (synchronizes profile events)
- **Scheduler**: [node-cron](https://github.com/node-cron/node-cron) (background cleanups)

---

## ⚙️ Environment Variables

Create a `.env` file in the `user/` directory:

| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | `4002` | Express server running port. |
| `REDIS_URL` | Yes | `redis://redis:6379` | Cache configuration endpoint. |
| `GRPC_PORT` | Yes | `50051` | gRPC server port for authentication queries. |
| `GRPC_PAYMENT_PORT` | Yes | `50053` | gRPC server port for subscription and payment validations. |
| `MONGODB_URI` | Yes | `mongodb+srv://...` | MongoDB database connection string for `User` namespace. |
| `AWS_S3_BUCKET_NAME` | Yes | `s3-buxlo` | AWS S3 Bucket Name for media files. |
| `AWS_S3_BUCKET_REGION` | Yes | `ap-southeast-2` | S3 bucket region. |
| `AWS_S3_BUCKET_ACCESS_KEY` | Yes | `AKIAR52NK44...` | IAM access key. |
| `AWS_S3_BUCKET_SECRET_ACCESS_KEY` | Yes | `rEN5RuIp8hA1z...` | IAM secret key. |
| `EMAIL_USER` | Yes | `buxlofinance@gmail.com` | Notification email client user. |
| `EMAIL_PASS` | Yes | `uptn ediv twos xtta` | Notification email app password. |
| `KAFKA_BROKER` | Yes | `kafka:9092` | Network host and port for Kafka. |
| `KAFKA_CLIENT_ID` | Yes | `user-service` | Kafka client name. |
| `KAFKA_GROUP_ID` | Yes | `user-group` | Kafka consumer group name. |

---

## 📡 Port & RPC Configurations

### REST Routes
- `GET /api/user/profile` — Retrieves active user info.
- `PUT /api/user/profile` — Updates profile info and uploads picture to S3.
- `GET /api/user/mentors` — Lists public mentors.
- `POST /api/user/mentors/rate` — Submits a rating/review for a mentor.

### gRPC Interfaces
- **Auth Endpoint (`:50051`)**: Exposes methods for checking user profiles and logins.
- **Payment/Subscription Sync (`:50053`)**: Updates user status (e.g. basic to premium mentor / subscriber level) upon payment completion.

---

## 🏃 Local Setup & Running

From the `user/` directory:

```bash
# 1. Install dependencies
npm install

# 2. Run the server using tsx watch
npm run start
```
Starts `tsx watch src/server.ts` for live TypeScript updates.

---

Developed for **BUXLO Personal Finance & Mentorship Platform**.