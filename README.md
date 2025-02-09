# 🚀 Text Analyzer

This repository contains a feature-rich application with authentication, caching, rate limiting, and much more.

## 📌 Features
- 🔑 **OAuth Authentication** using **Keycloak**
- 🚀 **Rate Limiting** with **Express-Rate-Limit**
- ⚡ **Caching** implemented using **Redis** to store analyzed data
- 🧪 **Testing** with **Jest & Supertest**
- 🏗 **Containerized Services** with **Docker Compose**
-
- 📊 **Database Management** with **MongoDB**

---

## 🛠️ Setup Guide

### **1️⃣ Clone the Repository**
```sh
 git clone git@github.com:raihan862/text-analyzer.git
 cd your-repo
```

### **2️⃣ Environment Variables**
Create a `.env` file and configure the required environment variables:
```env
PORT=3000
DATABASE_URL="mongodb://root:1234@localhost:27017/text-analizer?directConnection=true&authSource=admin&retryWrites=true"
REDIS_URL="redis://localhost:6379" 
KEYCLOAK_ISSUER=http://localhost:8080/realms/text-analyzer
KEYCLOAK_CLIENT_ID=nestjs-oauth-client
```

### **3️⃣ Run with Docker Compose**
```sh
 docker-compose up -d
```

### **4️⃣ Access Services**
| Service       | Port  |
|--------------|------|
| **App**      | `3000` |
| **Keycloak** | `8080` |
| **Redis**    | `6379` |
| **mongodb** | `27017` |
| **PostgreSQL** | `5000` |

Now you can access the app at: **http://localhost:3000** 🚀

---

## 📡 API Endpoints

### 🔑 **Authentication** (Keycloak OAuth)
- `POST /auth/login` - Login with username & password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout

### 📊 **Data Management**
- `GET /users` - Fetch all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Remove a user

### 📈 **Caching & Performance**
- `GET /analytics` - Fetch cached analytics data from Redis
- `POST /analytics` - Process & cache new data

### 🚦 **Rate Limiting**
- Applied globally at `100 requests per minute` for non-authenticated users.
- Authenticated users have higher limits.

---

## 🛠️ Technologies Used

| Feature       | Tool |
|--------------|------|
| **Backend**  | Node.js (Express) |
| **Auth**     | Keycloak |
| **Database** | PostgreSQL, MongoDB |
| **Caching**  | Redis |
| **Queueing** | RabbitMQ |
| **Testing**  | Jest, Supertest |
| **Logging**  | Winston |
| **Containerization** | Docker, Docker Compose |

---

## 🧑‍💻 Contributing
Want to improve this project? Feel free to fork and submit a PR!

---

## 📜 License
This project is licensed under the MIT License.

