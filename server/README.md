# API Routes Documentation

## Authentication Routes

### Login

- **Endpoint**: `/login`
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
    "jwtAccessToken": "string",
    "userData": {
      "id": "string",
      "name": "string",
      "email": "string",
      "createdAt": "string"
    }
  }
  ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  ```json
  {
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "Invalid email or password"
    }
  }
  ```
  - **Code**: 429 Too Many Requests
  ```json
  {
    "error": {
      "code": "RATE_LIMIT_EXCEEDED",
      "message": "Too many login attempts. Please try again later"
    }
  }
  ```

### Sign Up

- **Endpoint**: `/signUp`
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
  - **Code**: 201 Created
  ```json
  {
    "jwtAccessToken": "string",
    "userData": {
      "id": "string",
      "name": "string",
      "email": "string",
      "createdAt": "string"
    }
  }
  ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input data",
      "details": {
        "email": "Invalid email format",
        "password": "Password must be at least 8 characters"
      }
    }
  }
  ```
  - **Code**: 409 Conflict
  ```json
  {
    "error": {
      "code": "EMAIL_EXISTS",
      "message": "Email already registered"
    }
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
- Rate limiting is applied to prevent brute force attacks
- Passwords are hashed using bcrypt
