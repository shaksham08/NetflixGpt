# API Routes Documentation

## Authentication Routes

### Login

- **Endpoint**: `/user/login`
- **Method**: POST
- **Description**: Authenticates a user and sets a JWT token as an HTTP-only cookie via middleware.
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
  - **Note**: The `token` is also set as an HTTP-only cookie named `netflix_id`.
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
- **Description**: Creates a new user account and sets a JWT token as an HTTP-only cookie via middleware.
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
  - **Note**: The `token` is also set as an HTTP-only cookie named `netflix_id`.
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

## Password Reset

### Request Password Reset

- **Endpoint**: `/user/reset-password`
- **Method**: POST
- **Description**: Sends password reset instructions to the user's email.
- **Payload**:
  ```json
  {
    "email": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  ```json
  {
    "message": "Password reset instructions have been sent to your email"
  }
  ```

### Validate Reset Token

- **Endpoint**: `/user/validate-reset-token`
- **Method**: POST
- **Description**: Validates a password reset token.
- **Payload**:
  ```json
  {
    "token": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  ```json
  {
    "message": "Token is valid"
  }
  ```

### Update Password

- **Endpoint**: `/user/update-password`
- **Method**: POST
- **Description**: Updates the user's password using a valid reset token.
- **Payload**:
  ```json
  {
    "token": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  ```json
  {
    "message": "Password updated successfully"
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
- JWT tokens are set as HTTP-only cookies (`netflix_id`) for authentication
- JWT tokens expire after 24 hours
- Rate limiting is applied (100 requests per 15 minutes per IP)
- Passwords are hashed using bcrypt
- Input validation using Zod schema
- Cookie options: `httpOnly: true`, `secure: true` in production
- Sensitive data is never exposed in responses

## Implementation Notes

- The token is available in both the response body and as a secure, HTTP-only cookie.
- Error handling is consistent and uses structured JSON responses.
- All sensitive operations are protected and validated.

## Future Ideas

1. Host a list of videos on aws first and then load them in real time like how netflix and other platform does. These will be just dummy freemium videos that we can render
