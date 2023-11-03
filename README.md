# Yatri-Cabs-Task-Internship-

# User Management Application

This is a simple user management application built with Node.js, Express, and MongoDB.

## Setup and Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- MongoDB

### Steps

1. **Clone the repository:**

   git clone https://github.com/sidkhurana2002/Yatri-Cabs-Task-Internship-.git

2. **Install dependencies:**

   npm install

3. **Configure MongoDB:**

4. **Run the application:**

   npm start

   The server will start on port 3001 or the port specified in the `process.env.PORT` variable.

## API Endpoints

- **Get all users:**

  GET /api/users

- **Get user by ID:**

  GET /api/users/:id

- **Create a new user:**

  POST /api/users

- **Update user by ID:**

  PUT /api/users/:id

- **Delete user by ID:**

  DELETE /api/users/:id

## Application Structure

- **`config/db.js`**: Configuration file for connecting to MongoDB.
- **`models/user.js`**: MongoDB schema for the User model.
- **`controllers/userController.js`**: Controller functions for handling user-related logic.
- **`routes/userRoutes.js`**: Express routes for user-related endpoints.
- **`server.js`**: Main server file where the Express app is configured and routes are applied.
