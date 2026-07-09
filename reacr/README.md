# MERN JWT Authentication System

A complete authentication system built with MongoDB, Express.js, React.js, Node.js, JWT, and bcrypt. This project includes user registration, login, and a protected dashboard.

## Project Structure

```
mern-auth/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── Auth.css
    │   │   └── Dashboard.css
    │   ├── components/
    │   │   └── PrivateRoute.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── .env.example
    └── .gitignore
```

## Features

### Backend

- **User Registration**: Create new accounts with email validation and unique email constraint
- **Password Hashing**: Secure passwords using bcrypt
- **User Login**: Authenticate users and generate JWT tokens
- **Protected Routes**: JWT middleware for securing endpoints
- **User Profile**: Retrieve logged-in user information
- **CORS**: Enabled for frontend-backend communication

### Frontend

- **Register Page**: User registration form with validation
- **Login Page**: User login form with JWT token storage
- **Dashboard Page**: Protected route showing user information
- **Private Routes**: Redirect unauthorized users to login
- **Notifications**: Toast notifications for user feedback
- **Token Management**: Automatic JWT token handling with axios interceptors

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or MongoDB Atlas)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_super_secret_key_here_change_this_in_production
PORT=5000
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Register
- **POST** `/api/register`
- **Body**: 
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
- **POST** `/api/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Profile (Protected)
- **GET** `/api/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Usage

### 1. Register a New User
- Go to `http://localhost:3000/register`
- Fill in the name, email, and password
- Click Register
- You'll be redirected to the dashboard

### 2. Login
- Go to `http://localhost:3000/login`
- Enter your email and password
- Click Login
- You'll be redirected to the dashboard

### 3. View Dashboard
- The dashboard is protected and only accessible if you're logged in
- It displays your name, email, and user ID
- Click the Logout button to clear the token and return to the login page

## Project Dependencies

### Backend
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **bcrypt**: Password hashing library
- **jsonwebtoken**: JWT token generation and verification
- **cors**: Enable CORS for cross-origin requests
- **dotenv**: Environment variable management

### Frontend
- **react**: JavaScript library for building user interfaces
- **react-dom**: React package for DOM rendering
- **axios**: HTTP client for API requests
- **react-router-dom**: Routing library for React
- **js-cookie**: Cookie management
- **react-toastify**: Toast notification library

## Authentication Flow

1. **Registration**: User provides name, email, and password
2. **Password Hashing**: Password is hashed using bcrypt before saving
3. **JWT Generation**: After registration or login, a JWT token is generated
4. **Token Storage**: Token is stored in browser cookies (7-day expiration)
5. **Protected Routes**: Private routes check for token before allowing access
6. **Token Verification**: API requests include the token in the Authorization header
7. **Profile Access**: The profile endpoint verifies the token and returns user data

## Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token authentication with expiration
- ✅ Email uniqueness validation
- ✅ Protected API routes
- ✅ CORS enabled for specific origins
- ✅ Token storage in HTTP-only cookies (configurable)
- ✅ Request/response error handling

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod`)
- Check the MONGO_URI in `.env` file
- Verify MongoDB is accessible on the specified host and port

### CORS Error
- Ensure CORS is enabled in backend `server.js`
- Check the proxy configuration in frontend `package.json`

### Token Not Being Sent
- Verify the token is stored in cookies
- Check browser Developer Tools > Application > Cookies
- Ensure Authorization header is correctly formatted

### 404 API Errors
- Verify backend is running on port 5000
- Check the REACT_APP_API_URL in frontend `.env`
- Ensure API routes are correctly defined in `backend/routes/auth.js`

## Development Tips

1. **For Backend Development**: Use `npm run dev` for automatic restart on code changes
2. **For Frontend Development**: React hot reload is enabled by default
3. **Debug Mode**: Open browser DevTools to inspect network requests and storage
4. **Testing APIs**: Use Postman or curl to test API endpoints

## Next Steps

To enhance this project:
- Add email verification
- Implement password reset functionality
- Add user role-based access control (RBAC)
- Add user profile update endpoint
- Implement refresh tokens
- Add rate limiting
- Add input validation and sanitization
- Add comprehensive error handling
- Add unit tests and integration tests
- Deploy to production (Heroku, AWS, Azure, etc.)

## License

ISC

## Support

For issues or questions, please create an issue in the repository.
