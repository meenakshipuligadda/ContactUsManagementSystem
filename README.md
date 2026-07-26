# Attendance Management System

A modern **Full Stack Attendance Management System** built using **React, TypeScript, Node.js, Express.js, MySQL, and Sequelize**. This application enables organizations to manage employee records efficiently through a clean and responsive web interface.

---

## Features

- Employee Registration
- View All Employees
- Update Employee Information
- Delete Employee Records
- Search Employees
- Responsive User Interface
- RESTful API Integration
- MySQL Database
- Sequelize ORM
- CORS Enabled

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- CORS

### Tools

- Visual Studio Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

## Project Structure

```
AttendanceManagementSystem
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend
    ├── config
    ├── models
    ├── routes
    ├── migrations
    ├── app.js
    ├── package.json
    └── ...

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/meenakshipuligadda/AttendanceManagementSystem.git
```

### 2. Navigate to the project

```bash
cd AttendanceManagementSystem
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:3001
```

---

## Database Setup

Create a MySQL database.

Example:

```sql
CREATE DATABASE attendance_management;
```

Update your database configuration inside:

```
backend/config/config.json
```

Run the application after connecting the database.

---

## REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /users | Get all employees |
| POST | /users | Register employee |
| PUT | /users/:id | Update employee |
| DELETE | /users/:id | Delete employee |

---

## Future Enhancements

- User Authentication (Login & Logout)
- JWT Authentication
- Role-Based Access Control (Admin/User)
- Attendance Tracking
- Employee Dashboard
- Reports & Analytics
- Export Data to Excel/PDF
- Email Notifications
- Profile Management
- Cloud Deployment (AWS)

---

## Learning Outcomes

This project helped me gain practical experience in:

- React with TypeScript
- Component-based UI development
- REST API development
- CRUD Operations
- Express.js
- MySQL Database Design
- Sequelize ORM
- Axios API Integration
- Git & GitHub Version Control
- Debugging Frontend and Backend Applications

---

## Author

**Meenakshi Puligadda**

Master's in Computer Information Systems

GitHub: https://github.com/meenakshipuligadda

LinkedIn: 

---


This project is created for educational and portfolio purposes.
