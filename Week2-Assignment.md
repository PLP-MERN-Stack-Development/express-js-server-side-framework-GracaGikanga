# 🚂 Week 2: Express.js – Server-Side Framework

## 🚀 Objective
Build a RESTful API using Express.js that implements standard CRUD operations, proper routing, middleware, and error handling.

---

## 📂 Project Overview
This project is a **Product Management API** built with Node.js and Express.js.  
It supports the following functionality:

- CRUD operations on products
- Filtering, searching, and pagination
- Product statistics by category
- Middleware for logging, authentication, and validation
- Comprehensive error handling

---

## 🛠️ Technologies & Dependencies
- Node.js (v18+)
- Express.js
- Mongoose (for MongoDB)
- body-parser
- uuid (for generating unique IDs)

---

## ⚡ Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-folder>

---

## 📄 Install Dependencies
- npm install

---

## Set up environment variables:

Create a .env file based on .env.example:

PORT=3000
API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection_string


##Start the server:

npm start

Server will run at http://localhost:3000

## 📌 API Endpoints

Products Resource
Method	Endpoint	Description
GET	/api/products	Get all products (supports filtering by category and pagination)
GET	/api/products/:id	Get a specific product by ID
POST	/api/products	Create a new product (requires validation & API key)
PUT	/api/products/:id	Update an existing product (requires validation & API key)
DELETE	/api/products/:id	Delete a product (requires API key)
GET	/api/products/search?name=<name>	Search products by name
GET	/api/products/stats	Get product statistics grouped by category

## Query Parameters

-Filtering by category:

GET /api/products?category=categoryname


## Pagination:

GET /api/products?page=2&limit=5


## Search by name:

GET /api/products/search?name=nameofproduct


🛡️ Middleware

Logger: Logs request method, URL, and timestamp

Authentication: Requires API key in headers for protected routes

Validation: Ensures product data is valid for creation and update

Error Handling: Handles NotFound, Validation, and server errors