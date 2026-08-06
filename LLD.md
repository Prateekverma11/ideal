# Low Level Design (LLD)

# Database Design

## Users Collection

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "phone": "9876543210",
  "password": "Encrypted Password",
  "role": "citizen"
}
```

---

## Rescuers Collection

```json
{
  "_id": "ObjectId",
  "user": "ObjectId(User)",
  "location": {
    "type": "Point",
    "coordinates": [
      77.5946,
      12.9716
    ]
  },
  "experience": 0,
  "vehicles": []
}
```

---

## Reports Collection

```json
{
  "_id": "ObjectId",
  "animalType": "Dog",
  "description": "Leg injured",
  "image": "Cloudinary URL",
  "location": {
    "type": "Point",
    "coordinates": [
      77.5946,
      12.9716
    ]
  },
  "reportedBy": "ObjectId(User)",
  "status": "pending",
  "acceptedBy": null,
  "createdAt": "Date"
}
```

---

## Notifications Collection

```json
{
  "_id": "ObjectId",
  "rescuer": "ObjectId(User)",
  "report": "ObjectId(Report)",
  "status": "pending",
  "isRead": false
}
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Animal Reports

### Create Report

```
POST /api/reports
```

---

## Notifications

### Get Notifications

```
GET /api/notifications
```

### Accept Rescue

```
PATCH /api/notifications/:id/accept
```

### Decline Rescue

```
PATCH /api/notifications/:id/decline
```

---

## Rescuers

### Register Rescuer

```
POST /api/rescuers/register
```

### Update Location

```
PUT /api/rescuers/location
```

---

# Frontend Pages

- Login
- Register
- Dashboard
- Report Animal
- Notifications
- Profile

---

# Backend Modules

- Authentication
- Reports
- Notifications
- Rescuers
- Users

---

# External Services

- MongoDB Atlas
- Cloudinary
- JWT Authentication