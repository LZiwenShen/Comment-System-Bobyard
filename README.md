# Bobyard Full-Stack Comment System

This project is a full-stack RESTful application built for the Bobyard coding challenge. It features a **Django REST Framework (DRF)** backend and a **React.js** frontend styled with **Tailwind CSS v4**.

## Tech Stack
- **Backend:** Python, Django, Django REST Framework, SQLite
- **Frontend:** React (Vite), Tailwind CSS v4
- **Database:** PostgreSQL (Production preference) / SQLite (Development)

## Getting Started

### 1. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Create and activate a virtual environment: `python -m venv venv`
3. Install dependencies: `pip install -r requirements.txt`
4. Run migrations: `python manage.py migrate`
5. (Optional) Re-import initial data: `python import_comments.py`
6. Start the server: `python manage.py runserver`

### 2. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Features Implemented
- **CRUD Functionality:** Full implementation of List, Add, Edit, and Delete for comments.
- **Admin Logic:** As per requirements, new comments are automatically assigned to the "Admin" user with the current timestamp.
- **Clean Design:** A responsive, modern UI built with Tailwind CSS v4, focusing on readability and professional aesthetics.
- **CORS Handling:** Configured to allow seamless communication between the React frontend and Django backend.

## Project Structure
- `/backend`: Contains the Django project, API logic, and the original `comments.json` dataset.
- `/frontend`: Contains the React source code and Tailwind configuration.