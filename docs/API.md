# Cendeki App API Documentation

## Overview

Cendeki App is an interactive learning platform that generates educational stories with fill-in-the-blank questions for History and English learning. This API documentation covers all endpoints, authentication, and setup instructions.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://cendeki-app.vercel.app`

## Authentication

The API uses JWT (JSON Web Token) based authentication. Tokens are stored in HTTP-only cookies.

### Authentication Flow

1. **Login/Register**: Receive JWT token in HTTP-only cookie
2. **Protected Routes**: Token automatically sent via cookie
3. **Middleware**: Validates token on protected endpoints

### Token Structure

```json
{
  "_id": "user_id",
  "email": "user@example.com"
}
```

## API Endpoints

### Authentication Endpoints

#### POST `/api/login`
Login user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "accessToken": "jwt_token_here"
}
```

**Response (400):**
```json
{
  "message": "email Invalid email",
  "status": 400
}
```

**Response (500):**
```json
{
  "message": "Internal server error",
  "status": 500
}
```

---

#### POST `/api/register`
Register a new user account.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25
}
```

**Response (201):**
```json
{
  "data": {
    "_id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

**Response (404):**
```json
{
  "message": "Email already used",
  "status": 404
}
```

---

#### POST `/api/auth/[...nextauth]`
NextAuth.js handler for Google OAuth integration.

**Query Parameters:**
- Handles NextAuth.js callback URLs

**Response:** Redirects based on OAuth flow

---

### Story & Journey Endpoints

#### POST `/api/openrouter-story`
Generate a new interactive story using AI.

**Query Parameters:**
- `query` (string): Topic for story generation
- `category` (string): "history" or "english" (default: "history")

**Response (200):**
```json
{
  "status": 200,
  "answer": {
    "_id": "story_id",
    "title": "Story Title",
    "story": "Story with ___1___ blanks",
    "fullStory": "Complete story with answers",
    "answer": ["answer1", "answer2", "answer3", "answer4", "answer5"],
    "category": "history"
  }
}
```

**Response (400):**
```json
{
  "status": 400,
  "errMsg": "Error OpenRouter API failed"
}
```

---

#### GET `/api/journey`
Get a random story for a specific category.

**Query Parameters:**
- `journey` (string): Category ("history" or "english")

**Response (200):**
```json
{
  "status": 200,
  "story": {
    "_id": "story_id",
    "title": "Story Title",
    "story": "Story with blanks",
    "answer": ["answer1", "answer2", "answer3", "answer4", "answer5"],
    "category": "history"
  }
}
```

---

#### POST `/api/journey/collect`
Submit user's journey completion and score.

**Request Body:**
```json
{
  "storyId": "story_id",
  "score": 150,
  "timer": "00:25"
}
```

**Response (200):**
```json
{
  "status": 200,
  "message": "Score saved successfully"
}
```

---

#### POST `/api/journey/retry`
Retry a journey with the same story.

**Request Body:**
```json
{
  "storyId": "story_id"
}
```

**Response (200):**
```json
{
  "status": 200,
  "story": {
    "_id": "story_id",
    "title": "Story Title",
    "story": "Story with blanks",
    "answer": ["answer1", "answer2", "answer3", "answer4", "answer5"]
  }
}
```

---

### User Profile Endpoints

#### GET `/api/profile`
Get current user profile with history and scores.

**Headers:** Requires authentication cookie

**Response (200):**
```json
{
  "_id": "user_id",
  "fullname": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "bio": "User bio",
  "history": [
    {
      "_id": "score_id",
      "storyId": "story_id",
      "score": 150,
      "timer": "00:25",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "story": {
        "title": "Story Title",
        "category": "history"
      }
    }
  ],
  "highestScore": 200,
  "totalScore": 450
}
```

---

#### PUT `/api/profile`
Update user profile information.

**Request Body:**
```json
{
  "fullname": "John Updated",
  "bio": "Updated bio"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

---

### Leaderboard Endpoint

#### GET `/api/leaderboard`
Get top players leaderboard.

**Response (200):**
```json
{
  "status": 200,
  "leaderboard": [
    {
      "_id": "user_id",
      "fullname": "John Doe",
      "highestScore": 500,
      "totalScore": 1200
    }
  ]
}
```

---

### Scoring Endpoint

#### POST `/api/scoring`
Submit score for completed journey.

**Request Body:**
```json
{
  "storyId": "story_id",
  "score": 150,
  "timer": "00:25"
}
```

**Response (200):**
```json
{
  "status": 200,
  "message": "Score recorded successfully"
}
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description",
  "status": 400
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Validation Errors

For input validation errors (using Zod):

```json
{
  "message": "field_name error_message",
  "status": 400
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for:
- AI story generation endpoints
- Login attempts
- Registration attempts

## Security Considerations

1. **JWT Tokens**: Stored in HTTP-only cookies
2. **Input Validation**: All inputs validated using Zod schemas
3. **Password Hashing**: Uses bcryptjs
4. **Environment Variables**: Sensitive data stored in environment variables

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  fullname: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  bio: String (optional)
}
```

### Story Model

```javascript
{
  _id: ObjectId,
  title: String,
  story: String (with blanks),
  fullStory: String (complete),
  answer: [String], // 5 answers
  category: String ("history" | "english")
}
```

### Score Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  storyId: ObjectId,
  score: Number,
  timer: String,
  createdAt: Date
}
```

## WebSocket Events

The application uses Socket.IO for real-time features:

### Client Events

- `coba` - Send data to server
- `trigger` - Trigger server action

### Server Events

- `hello` - Initial connection message
- `leader` - Leaderboard data
- `send` - Trigger response

## Development Notes

- Built with Next.js 14 App Router
- Database: MongoDB
- Authentication: NextAuth.js + custom JWT
- AI Integration: OpenRouter API
- Real-time: Socket.IO
