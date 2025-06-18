# SepcialTopics_21110192


npx create-react-app code-for-special

cd code-for-special

npm start


# Cyber Event Manager - API Documentation

## Backend API Endpoints

**Base URL:** `http://localhost:3001`

| Method | Endpoint | Description | Access Level | Request Body |
|--------|----------|-------------|--------------|--------------|
| GET | `/` | Home route | Public | None |
| GET | `/test` | Test route | Public | None |
| **Events API** |
| GET | `/api/events` | Get all events | Public | None |
| GET | `/api/events/:id` | Get event by ID | Public | None |
| POST | `/api/events` | Create new event | Admin Only | `{name, event_date, event_time, price}` |
| PUT | `/api/events/:id` | Update event | Admin Only | `{name, event_date, event_time, price}` |
| DELETE | `/api/events/:id` | Delete event | Admin Only | None |
| **Authentication API** |
| POST | `/api/auth/login` | User login | Public | `{email, password}` |
| POST | `/api/auth/signup` | User registration | Public | `{name, email, password, role}` |

## Frontend Routes

**Base URL:** `http://localhost:3000`

| Route | Component | Description | Access Level | Protected |
|-------|-----------|-------------|--------------|-----------|
| `/` | Home | Landing page | Public | No |
| `/events` | Events | Events list page | Public | No |
| `/events/:id` | EventDetails | Individual event details | Public | No |
| `/search` | HashSearch | Hash search form | Public | No |
| `/scan/:id` | HashDetails | Hash analysis results | Public | No |
| `/login` | Login | User login form | Public | No |
| `/signup` | Signup | User registration form | Public | No |
| `/management` | Management | Event CRUD operations | Admin Only | Yes |

## External API Integration

| Service | Endpoint | Usage | Access |
|---------|----------|-------|---------|
| VirusTotal | `https://www.virustotal.com/api/v3/files/:hash` | Hash analysis | API Key Required |

## Route Parameters

### Backend Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `:id` | Integer | Event ID | `1`, `2`, `3` |

### Frontend Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `:id` | String | Event ID with prefix | `ev-1`, `ev-2` |
| `:id` | String | Hash value | `47fcab85d25280942ac9752a5d5b4c8b85027273bdcde2191e3b9f560e568a27` |

## Request/Response Examples

### POST /api/auth/login
```json
// Request
{
  "email": "admin@example.com",
  "password": "admin123"
}

// Response
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### POST /api/events
```json
// Request
{
  "name": "Cybersecurity Workshop",
  "event_date": "2024-12-25",
  "event_time": "14:30",
  "price": 1500.00
}

// Response
{
  "id": 1,
  "name": "Cybersecurity Workshop",
  "event_date": "2024-12-25",
  "event_time": "14:30:00",
  "price": "1500.00"
}
```

## Access Control Summary

| User Role | Permissions |
|-----------|-------------|
| **Public** | View events, Search hashes, Login/Signup |
| **Regular User** | View events, Search hashes |
| **Admin** | All user permissions + Event CRUD operations |

## Complete URL Examples

### Backend API
```
GET    http://localhost:3001/api/events
POST   http://localhost:3001/api/auth/login
DELETE http://localhost:3001/api/events/1
```

### Frontend Routes
```
http://localhost:3000/
http://localhost:3000/events
http://localhost:3000/management
```