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
- Remove products from the cart
- Place orders
- View previous orders

The project uses a frontend, REST API backend, and SQLite database.

## 🚀 Features

### 👤 User Authentication

- User registration
- Secure password hashing using bcrypt
- User login
- JWT-based authentication
- Protected order APIs

### 🛍️ Product Management

- Product listing
- Product details page
- Product images
- Product descriptions
- Product pricing
- Individual product API

### 🛒 Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products
- Automatic total calculation
- Cart data stored using LocalStorage

### 📦 Order Processing

- Checkout system
- Order creation
- Order status
- Order history
- User-specific orders
- Order total calculation

### 🗄️ Database

SQLite database with the following tables:

- Users
- Products
- Orders
- Order Items

The SQLite database is created automatically when the backend starts.

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
│   └── package.json
│
└── README.md
```

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Jesi0505/CodeAlpha_EcommerceStore.git
```

### 2. Open the project

```bash
cd CodeAlpha_EcommerceStore
```

### 3. Open the backend

```bash
cd backend
```

### 4. Install backend dependencies

```bash
npm install
```

### 5. Start the backend

```bash
npm start
```

The backend API runs on:

```text
http://localhost:3000
```

### 6. Start the frontend

Open a new terminal and run:

```bash
cd CodeAlpha_EcommerceStore/frontend
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 🔐 Authentication Flow

```text
User
  ↓
Register / Login
  ↓
Backend API
  ↓
SQLite Database
  ↓
JWT Token
  ↓
Authenticated User
```

## 🛒 Shopping and Order Flow

```text
Browse Products
      ↓
Product Details
      ↓
Add to Cart
      ↓
Shopping Cart
      ↓
Checkout
      ↓
Order Created
      ↓
My Orders
```

## 🔗 Repository

GitHub Repository:

https://github.com/Jesi0505/CodeAlpha_EcommerceStore

## 🎯 Internship Task

**CodeAlpha Full Stack Development Internship**

### Completed Task

**Task 1 – Simple E-Commerce Store**

This project demonstrates:

- Frontend development
- Backend API development
- Database integration
- User authentication
- Product management
- Shopping cart functionality
- Order processing
- REST API integration
- Full-stack application development

## 👩‍💻 Developer

**Jesima Yohaana**

B.E. Computer Science and Engineering  
SRM Madurai College for Engineering and Technology
