## 🔐 User Authentication

- Users can **register** and **log in** securely.
- A **JWT token** is generated and returned on successful login.
- Protected routes (like `/api/users/profile`) are only accessible with a valid JWT token.
- Tokens should be passed in the `Authorization` header as:
  
