🛒 MERN Stack E-Commerce Platform

A full-stack E-Commerce web application built with MongoDB, Express.js, React.js and Node.js and integrated with Braintree Payment Gateway.
Users can browse products, add them to cart, and make secure online payments.

🌐 Live Website:https://mern-stack-e-commerce-project-6.onrender.com

✨ Features
👤 User

Register & Login

Browse Products

Search & Filter

Add to Cart

Remove from Cart

Secure Checkout

Online Payment via Braintree

View Order History

🔐 Admin

Add / Update / Delete Products

Manage Inventory

View Orders

💳 Payment Gateway

This project uses Braintree.

🛠️ Tech Stack
Layer	Technology
Frontend	React.js
Backend	Node.js, Express.js
Database	MongoDB
Authentication	JWT
Payment	Braintree
Deployment	Render
📁 Project Structure
MERN-Stack-E-commerce-Project
│
├── client        # React Frontend
├── controllers  # Backend logic
├── models       # MongoDB Schemas
├── routes       # API Routes
├── middlewares  # Auth & security
├── helpers      # Utility functions
├── config       # Database config
├── server.js    # Backend entry
└── README.md


🚀 Installation

Clone the repository

git clone https://github.com/nageshwari21/MERN-Stack-E-commerce-Project.git
cd MERN-Stack-E-commerce-Project


Install backend

npm install


Install frontend

cd client
npm install

▶ Run the Application

Start backend

npm run dev


Start frontend

cd client
npm start


Open in browser

http://localhost:8080

🔄 Braintree Payment Flow

Frontend requests a token from backend

Backend generates Braintree token

User enters card details

Braintree creates payment nonce

Backend verifies and processes payment

Order is saved in database

🧪 Braintree Test Cards
Card	Number
Visa	4111 1111 1111 1111
CVV	123
Expiry	12/30
🌐 Deployment

This project is deployed on Render.

Build command

npm install && cd client && npm install && npm run build


Start command

node server.js

👨‍💻 Developer

Nageshwari Ghongade
GitHub: https://github.com/nageshwari21

