# 3W Task 1 – Mini Social Post Application (Auth Setup)

This project is part of the **3W Full Stack Internship Assignment – Task 1**.  
So far, we have successfully implemented the **authentication system** (Signup & Login) with a full **frontend + backend + MongoDB Atlas** setup.

## How to Use the Website

1. Open the application in the browser
2. Sign up using a valid email and password
3. Login using registered credentials
4. User is redirected to the dashboard
5. View the public social feed
6. Create a new post by:
   - Writing text
   - Uploading an image
   - Or both
7. Posts appear instantly in the feed
8. Like any post to increase like count
9. Click "View Likes" to see users who liked the post
10. Add comments on any post
11. View all comments with usernames
12. Click on the avatar in the top-right corner
13. Select logout to end the session


## Tech Stack Used

### Frontend
- React.js (Vite)
- React Router DOM
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

## Dashboard & Social Feed (Completed)

### Frontend
- Fixed top navigation bar
- Social Feed title aligned to the left
- User avatar aligned to the right
- Avatar displays first letter of logged-in user’s email
- Clickable avatar with logout option
- Logout clears localStorage and redirects to login
- Feed content aligned to the center
- Responsive layout for desktop and mobile

### Create Post
- Users can create a post with:
  - Text only
  - Image only
  - Text + image
- Text and image fields are optional (at least one required)
- Image upload handled using Multer
- Post is created and reflected instantly in the feed

### Feed
- Public feed visible to all authenticated users
- Displays posts from all users
- Each post displays:
  - User avatar (first letter)
  - Username (email)
  - Post creation date & time  
    - Format: `12 Feb 2026, 10:15 AM`
  - Text content (if available)
  - Image (if uploaded)

### Like Functionality
- Users can like any post
- Like count displayed on each post
- Same user cannot like the same post multiple times
- Clicking "View Likes" shows:
  - List of users who liked the post

### Comment Functionality
- Users can comment on any post
- Comment count displayed on each post
- Comments store:
  - Comment text
  - Username (email)
- Clicking comments section shows:
  - List of all comments with usernames

### Backend (Posts)
- Post model with text, image, likes, comments, timestamps
- Multer configured for image uploads
- Create post API
- Fetch all posts API
- Like post API
- Comment on post API
- JWT protected post routes

## Project Status

- Authentication system: Completed
- Dashboard layout: Completed
- Create post: Completed
- Feed display: Completed
- Like functionality: Completed
- Comment functionality: Completed
- Image upload: Completed
- Logout flow: Completed
