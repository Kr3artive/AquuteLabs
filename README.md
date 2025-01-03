# Equipment Management System

## Overview

This project is a full-stack application designed for managing users and equipment. It features a responsive frontend that interacts with a secure backend for user authentication and CRUD operations on equipment data.

## Features

### User Management
- **Signup**: New users can create an account.
- **Login**: Existing users can log in securely.
- **Password Reset**: Users can reset their password if forgotten.

### Equipment Management
- Manage equipment data with attributes including:
  - **Title**
  - **Lessee**
  - **Category**
  - **Availability**
  - **Price**
  - **Description**
  - **Image**
- RESTful API endpoints ensure smooth data processing.

## Technologies Used

### Frontend
- **React**: For building a dynamic and responsive user interface.
- **TailwindCSS**: For styling components.
- **Axios**: For making HTTP requests.
- **React Hook Form**: For form validation and management.
- **React Icons**: For adding icons.
- **React Router DOM**: For managing navigation and routing.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: As the database to store user and equipment data.
- **bcryptjs**: For password hashing to ensure secure authentication.
- **cors**: For handling cross-origin requests.
- **crypto**: For secure data encryption and decryption.
- **dotenv**: For environment variable management.
- **jsonwebtoken**: For token-based authentication.
- **multer**: For handling file uploads.
- **nodemailer**: For sending emails.
- **nodemon**: For automatic server restarts during development.

### Other Tools
- **Postman**: For API testing.
- **Git**: For version control.

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB server running

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd equipment-management-system
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

6. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

7. Start the frontend server:
   ```bash
   cd ../frontend
   npm run dev
   ```

## API Endpoints

### User Routes
- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Authenticate user and return a token.
- **POST /auth/forgot-password**: Sends OTP to the user email.
- **POST /auth/reset-password**: Reset user password.

### Equipment Routes
- **POST /equipment/addequipment**: Add new equipment.
- **GET /equipment/allequipment**: Fetch all equipment.
- **GET /equipment/particularequipment/:id**: Fetch a single piece of equipment by ID.
- **PUT /equipment//updateequipment/:id**: Update equipment data.
- **DELETE /equipment/deleteequipment/:id**: Delete equipment.


## Future Improvements
- Add role-based access control.
- Implement advanced filtering for equipment search.
- Integrate a payment gateway for equipment rentals.

## Contributors
- **Abiye Omiete**  
  - Email: [abiyerowland@gmail.com](mailto:abiyerowland@gmail.com)  
  - GitHub: [Kr3artive](https://github.com/Kr3artive)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
