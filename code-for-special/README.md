# Cyber Event Manager - Frontend

React.js frontend for managing cybersecurity events with hash analysis capabilities.

## Features

- events
- VirusTotal hash analysis 
- authentication
- authorization

## Setup

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

## Pages

- Home (`/`) - Landing page
- Events (`/events`) - Browse events list
- Event Details (`/events/:id`) - View specific event
- Hash Search (`/search`) - Search file hashes
- Hash Results (`/scan/:id`) - VirusTotal analysis results
- Login (`/login`) - User authentication
- Signup (`/signup`) - User registration
- Management (`/management`) - Event CRUD (admin only)

## User Roles

Regular User:
- View events
- Search hashes

Administrator:
- All user permissions
- Create/edit/delete events

## Environment

Ensure backend is running on `http://localhost:3001`, netstat works to try and making things work
## Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "bootstrap": "^5.x",
  "axios": "^1.x"
}
```