# Project Management Tool

Table of Contents
Overview

Features

Tech Stack

Installation

Usage

Testing

Assumptions & Trade-offs

# Overview

This is a Project Management Tool designed to help users create, manage, and track tasks within different projects. It is built using React (frontend), Node.js (backend), and MongoDB (database). The application includes CRUD operations for projects and tasks, an intuitive UI with Material-UI, and state management using Redux Toolkit.

# Features

RESTful API: Built with Express.js to manage projects and tasks.

MongoDB Database: Uses Mongoose for schema validation and data modeling.

Middleware-based Validation: Uses express-validator to validate API requests.

Authentication (Planned): JWT-based authentication for user roles and permissions.

Error Handling: Centralized error handling for cleaner API responses.

Logging & Debugging: Uses Morgan for request logging.

# Tech Stack

Backend:
Node.js & Express.js (REST API)

MongoDB & Mongoose (NoSQL Database)

Express Validator (Data validation)

Jest & Supertest (Backend testing)

Installation
Prerequisites:
Install Node.js (v18 or higher)

Install MongoDB (or use MongoDB Atlas for cloud database)

# Clone the Repository

sh
Copy
Edit
git clone https://github.com/Makksr/gfuture-project-management-backend.git
cd gfuture-project-management-backend

# Backend Setup

sh
Copy
Edit
cd backend
npm install
cp .env.example .env # Set up environment variables
npm run dev # Start the backend in development mode

Testing

Backend Tests:
Jest & Supertest used for API route testing.

Covers validation errors, successful CRUD operations, and edge cases.

Run Tests:

# Backend

npm test

# Assumptions & Trade-offs

Using MongoDB over SQL:

Chose MongoDB for flexibility in project and task relationships.

Trade-off: Lacks strong relational constraints compared to SQL.

Validation on API vs. Frontend:

API has strict express-validator checks for data integrity.

Trade-off: Some validation is duplicated on frontend for better UX.

Middleware-based Authentication :

Trade-off: No authentication yet, so the API is open for now.

Error Handling via Middleware:

All API errors are formatted in a consistent JSON response.
