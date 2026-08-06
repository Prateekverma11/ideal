# Product Requirements Document (PRD)

## Project Name
Animal Rescuer

## Project Overview
Animal Rescuer is a web application that helps citizens report injured or abandoned animals and allows registered rescuers to receive notifications and respond quickly.

---

## Problem Statement

Many injured animals do not receive timely help because there is no simple platform for citizens to notify nearby rescuers.

---

## Objectives

- Allow citizens to register and log in.
- Allow citizens to report injured animals.
- Allow image upload for reports.
- Capture the user's current location.
- Notify nearby rescuers.
- Allow rescuers to accept or decline rescue requests.

---

## User Roles

### Citizen

- Register
- Login
- Report injured animal
- Upload image
- Share current location

### Rescuer

- Register
- Login
- Receive notifications
- Accept rescue
- Decline rescue
- View profile

---

## Functional Requirements

### Authentication

- User Registration
- User Login
- JWT Authentication

### Animal Reporting

- Select animal type
- Enter description
- Upload image
- Capture current location
- Save report

### Notifications

- Notify nearby rescuers
- View notifications
- Accept rescue
- Decline rescue

### Profile

- View rescuer profile

---

## Non-Functional Requirements

- Responsive UI
- Secure JWT authentication
- MongoDB Atlas database
- Cloudinary image storage
- REST API architecture

---

## Technology Stack

### Frontend

- React
- Vite
- Axios
- React Router

### Backend

- Node.js
- Express.js
- JWT
- Multer

### Database

- MongoDB Atlas
- Mongoose

### Cloud Storage

- Cloudinary