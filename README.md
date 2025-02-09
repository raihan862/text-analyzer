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

| Service        | Port    |
| -------------- | ------- |
| **App**        | `3000`  |
| **Keycloak**   | `8080`  |
| **Redis**      | `6379`  |
| **mongodb**    | `27017` |
| **PostgreSQL** | `5000`  |

Now you can access the app at: **http://localhost:3000** 🚀

---

## 🛠️ Technologies Used

| Feature              | Tool                   |
| -------------------- | ---------------------- |
| **Backend**          | Nest.js                |
| **Auth**             | Keycloak               |
| **Database**         | MongoDB                |
| **Caching**          | Redis                  |
| **Testing**          | Jest, Supertest        |
| **Containerization** | Docker, Docker Compose |

---

##🔐 Login Guide

All endpoints are protected, so you must provide a valid token to access any route. Additionally, you can only request Analysis Endpoints using the same user who created the text; otherwise, you will receive an unauthorized error.

To log in, use the following credentials:

Username: user

Password: user123

If the login does not work, follow these steps:

Open Keycloak Admin Panel at http://localhost:8080/admin.

Log in as the administrator.

Switch the realm to Text Analyzer.

Navigate to Users and create a new user.

Set the username and email, and enable Email Verified.

Clear all Required User Actions.

Go to the Credentials tab, set a password, and uncheck Temporary Password.

Save the user and try logging in again.

---

##📡 API Endpoints

🔑 Authentication (Keycloak OAuth)

POST /auth/login - Login with username & password

📊 Data Management

POST /text - Create a new text entry - requestbody - {"content":"your content"}

GET /text - Retrieve all text entries

GET /text/:id - Get a specific text entry

PATCH /text/:id - Update a text entry

DELETE /text/:id - Remove a text entry

📈 Analysis Endpoints

GET /analyzer/word-count/:id - Get word count of text

GET /analyzer/char-count/:id - Get character count of text

GET /analyzer/sentence-count/:id - Get sentence count of text

GET /analyzer/paragraph-count/:id - Get paragraph count of text

GET /analyzer/longest-word/:id - Get the longest word in text
