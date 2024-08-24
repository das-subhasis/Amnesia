Here is the plain text for your `README.md` file:

---

# Amnesia E-Commerce App

## Overview

Welcome to the MERN E-Commerce Project Amnesia! This full-stack e-commerce application is built with MongoDB, Express.js, React.js, and Node.js. It provides a seamless shopping experience with features including user authentication, product management, cart and wishlist functionality, and order processing.

## Features

- **User Authentication**: Secure registration and login functionality for users.
- **Product Management**: Display a variety of products with details such as name, price, description, and images.
- **Cart**: Manage items in your shopping cart, including adding, removing, and updating quantities.
- **Wishlist**: Save favorite products to a wishlist for future reference.
- **Order Processing**: Place orders and view order history.

## Technologies Used

- **Frontend**: 
  - React.js
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB
- **Authentication**: 
  - JWT (JSON Web Tokens)

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mern-ecommerce.git
   cd Amnesia
   ```

2. **Install frontend dependencies:**
   ```bash
   cd FrontEnd
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../BackEnd
   npm install
   ```

4. **Setup environment variables:**
   - Create a `.env` file in the `server` directory with the following content:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the application:**
   - Start the backend server:
     ```bash
     cd BackEnd
     tsc -b
     node ./dist/index.js
     ```
   - Start the frontend development server:
     ```bash
     cd ../FrontEnd
     npm run dev
     ```

6. **Open your browser and navigate to `http://localhost:3000` to view the application.**

## Usage

- **Register**: Use the signup form to create a new account.
- **Login**: Log in with your credentials to access your account.
- **Browse Products**: Explore the product catalog to view available items.
- **Add to Cart**: Add products to your cart and manage them.
- **Add to Wishlist**: Save products to your wishlist for future purchase.
