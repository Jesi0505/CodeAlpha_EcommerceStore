# 🛒 CodeAlpha E-Commerce Store

A full-stack e-commerce web application developed as part of the **CodeAlpha Full Stack Development Internship**.

## 📌 Project Overview

CodeAlpha Store is a simple online shopping platform where users can:

- Browse products
- View detailed product information
- Register an account
- Login securely
- Add products to a shopping cart
- Increase or decrease product quantity
- Place orders
- View their previous orders

The project uses a frontend, REST API backend, and SQLite database.

## 🚀 Features

### 👤 User Authentication
- User registration
- Secure password hashing using bcrypt
- User login
- JWT-based authentication

### 🛍️ Product Management
- Product listing
- Product details page
- Product images
- Product descriptions
- Product pricing

### 🛒 Shopping Cart
- Add products to cart
- Increase/decrease quantity
- Remove products
- Automatic total calculation

### 📦 Order Processing
- Checkout system
- Order creation
- Order status
- Order history
- User-specific orders

### 🗄️ Database
SQLite database with the following tables:

- Users
- Products
- Orders
- Order Items

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- LocalStorage

### Backend
- Node.js
- Express.js
- REST API

### Database
- SQLite

### Authentication
- bcryptjs
- JSON Web Token (JWT)

### Development Tools
- GitHub
- GitHub Codespaces
- VS Code

## 📁 Project Structure

```text
CodeAlpha_EcommerceStore/
│
├── frontend/
│   ├── index.html
│   ├── products.html
│   ├── product.html
│   ├── cart.html
│   ├── login.html
│   ├── register.html
│   ├── orders.html
│   │
│   └── css/
│       └── style.css
│
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── database.sqlite
│
└── README.md
