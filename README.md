# 3W Task 1 – Mini Social Post Application (Auth Setup)

This project is part of the **3W Full Stack Internship Assignment – Task 1**.  
So far, we have successfully implemented the **authentication system** (Signup & Login) with a full **frontend + backend + MongoDB Atlas** setup.


## Tech Stack Used

### Frontend
- React.js (Vite)
- React Router DOM
- Material UI (MUI)
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv

## 🔐 Features Implemented 

### Authentication (Completed)
- User Signup with email & password
- User Login with email & password
- Password hashing using **bcrypt**
- JWT token generation on login
- JWT stored on frontend using `localStorage`
- Centralized JWT authentication middleware
- Protected backend route for testing authentication
- Redirect to dashboard after successful login

### Frontend
- Login Page UI (Material UI)
- Signup Page UI (Material UI)
- Form state handling with validation
- API integration with backend
- Routing using React Router
- Blank Dashboard page (placeholder after login)

### Backend
- MongoDB Atlas connection
- User model with email & password
- Signup & Login APIs
- JWT-based authentication
- Centralized auth middleware
- Protected route verification

## Authentication Flow

1. User signs up using email & password
2. Password is hashed and stored in MongoDB Atlas
3. User logs in with credentials
4. Backend verifies credentials
5. JWT token is generated and returned
6. Frontend stores token in `localStorage`
7. User is redirected to dashboard
8. Protected routes are accessible only with valid JWT