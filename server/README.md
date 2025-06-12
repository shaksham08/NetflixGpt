# API Routes Documentation

## Authentication Routes

### Login

- **Endpoint**: `/user/login`
- **Method**: POST
- **Description**: Authenticates a user and returns a JWT token
- **Payload**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  ```json
  {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  ```json
  {
    "error": "User not found"
  }
  ```
  or
  ```json
  {
    "error": "Invalid password"
  }
  ```
  or
  ```json
  {
    "error": "Invalid email format"
  }
  ```
  or
  ```json
  {
    "error": "Password must be at least 6 characters"
  }
  ```
  - **Code**: 429 Too Many Requests
  ```json
  {
    "error": "Too many requests, please try again later"
  }
  ```
  - **Code**: 500 Internal Server Error
  ```json
  {
    "error": "Internal server error"
  }
  ```

### Sign Up

- **Endpoint**: `/user/signup`
- **Method**: POST
- **Description**: Creates a new user account
- **Payload**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  ```json
  {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "string"
  }
  ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  ```json
  {
    "error": "User already exists"
  }
  ```
  or
  ```json
  {
    "error": "Invalid email format"
  }
  ```
  or
  ```json
  {
    "error": "Password must be at least 6 characters"
  }
  ```
  or
  ```json
  {
    "error": "Name must be at least 2 characters"
  }
  ```
  - **Code**: 429 Too Many Requests
  ```json
  {
    "error": "Too many requests, please try again later"
  }
  ```
  - **Code**: 500 Internal Server Error
  ```json
  {
    "error": "Internal server error"
  }
  ```

## Common Error Codes

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 400  | Bad Request - Invalid input data            |
| 401  | Unauthorized - Invalid or missing JWT token |
| 403  | Forbidden - Insufficient permissions        |
| 404  | Not Found - Resource not found              |
| 429  | Too Many Requests - Rate limit exceeded     |
| 500  | Internal Server Error - Server-side error   |

## Security

- All endpoints use HTTPS
- JWT tokens expire after 24 hours
- Rate limiting is applied (100 requests per 15 minutes per IP)
- Passwords are hashed using bcrypt
- Input validation using Zod schema
