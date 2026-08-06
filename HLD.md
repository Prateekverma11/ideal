# High Level Design (HLD)

# Animal Rescuer System

## System Architecture

```
Citizen / Rescuer
        │
        ▼
 React Frontend (Vite)
        │
   REST API (Axios)
        │
        ▼
 Node.js + Express Backend
        │
        ▼
 MongoDB Atlas Database
        │
        ├────────► Cloudinary
        │            (Image Storage)
        │
        ▼
 Notification System
```

---

# Major Modules

## 1. Authentication Module

Responsibilities:

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## 2. Animal Report Module

Responsibilities:

- Report injured animal
- Upload image
- Save report
- Capture current location

---

## 3. Notification Module

Responsibilities:

- Find nearby rescuers
- Create notification
- Accept rescue request
- Decline rescue request

---

## 4. Rescuer Module

Responsibilities:

- Register rescuer profile
- Update rescuer location
- Find nearby reports

---

## 5. Profile Module

Responsibilities:

- Display rescuer information
- Display experience
- Display rescue details

---

# Technologies Used

## Frontend

- React
- Vite
- React Router
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer

## Database

- MongoDB Atlas
- Mongoose

## Cloud Storage

- Cloudinary

---

# Data Flow

Citizen Login

↓

Submit Animal Report

↓

Upload Image to Cloudinary

↓

Store Report in MongoDB

↓

Search Nearby Rescuers

↓

Create Notifications

↓

Rescuer Receives Notification

↓

Accept / Decline Rescue

↓

Update Report Status