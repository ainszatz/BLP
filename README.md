# Norizz Blog Project

## Description
Norizz is a NestJS-based blog application designed for content creators and readers, offering secure authentication, seamless blog post management, and engaging comment functionality.

## Features
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Blog Posts**: Create, read, update, and delete blog posts.
- **Comments**: Users can comment on blog posts, enhancing interaction and engagement.

## API Documentation

### User Endpoints
### 1. POST /auth/register
Register new user

**Request Body:**
```json
{
    "username": "norizzuser",
    "password": "norizzuser",
    "email": "norizz@mail.com"
}
```

**Response Format:**
```json
{
    "statusCode": 201,
    "message": "User norizzuser registered successfully",
    "access_token": "***"
}
```
**Validations:**
- Email and Username must be unique and valid format
- All fields are required

### 2. POST /auth/login
Login existing user and get session id

**Request Body:**
```json
{
    "username": "norizzuser",
    "password": "norizzuser"
}
```
**Response Format:**
```json
{
    "statusCode": 200,
    "message": "Welcome norizzuser",
    "access_token": "***"
}
```

### 3. GET /users/profile/:username
Get user profile information

**Response Format:**
```json
{
    "id": 13,
    "username": "norizzuser",
    "password": "***",
    "email": "norizz@mail.com"
}
```

### 4. POST /auth/logout
Logout user and invalidate session id

**Response Format:**
```json
{
    "statusCode": 200,
    "message": "User logged out successfully"
}
```


### Post Endpoints
### 1. POST /posts
Create new post

**Request Body:**
```json
{
  "title": "Test Blog Post 123 Title",
  "content": "Test Blog Post 123 Content"
}
```
**Response Format:**
```json
{
    "title": "Test Blog Post 123 Title",
    "content": "Test Blog Post 123 Content",
    "authorId": 13,
    "author": {
        "id": 13,
        "username": "norizzuser",
        "password": "***",
        "email": "norizz@mail.com"
    },
    "id": 37,
    "createdAt": "2025-01-10T09:31:44.945Z",
    "updatedAt": "2025-01-10T09:31:44.945Z"
}
```
**Validations:**
- Only login user can post
- All fields are required

### 2. PUT /posts/:id
Update existing post

**Request Body:**
```json
{
  "title": "Updated Post Title 123",
  "content": "Updated Post Content 123"
}
```
**Response Format:**
```json
{
    "id": 37,
    "title": "Updated Post Title 123",
    "content": "Updated Post Content 123",
    "authorId": 13,
    "createdAt": "2025-01-10T09:31:44.945Z",
    "updatedAt": "2025-01-10T16:35:44.731Z"
}
```
**Validations:**
- Only Post creator can update

### 3. GET /posts/
List all posts

**Response Format:**
```json
...
    {
        "id": 37,
        "title": "Updated Post Title 123",
        "content": "Updated Post Content 123",
        "authorId": 13,
        "createdAt": "2025-01-10T09:31:44.945Z",
        "updatedAt": "2025-01-10T16:35:44.731Z",
        "comments": [
            {
                "id": 10,
                "content": "Test Comment 123",
                "createdAt": "2025-01-10T09:39:55.301Z",
                "updatedAt": "2025-01-10T09:39:55.301Z"
            }
        ],
        "author": {
            "id": 13,
            "username": "norizzuser",
            "password": "***",
            "email": "norizz@mail.com"
        }
    },
    {
        "id": 36,
        "title": "Tes Judul 5",
        "content": "Tes Konten 5",
        "authorId": 12,
        "createdAt": "2025-01-10T04:24:54.253Z",
        "updatedAt": "2025-01-10T04:24:54.253Z",
        "comments": [],
        "author": {
            "id": 12,
            "username": "ainz15",
            "password": "***",
            "email": "gogogo21@mail.com"
        }
    }
...

```
**Addition:**
- Use */post/:id* if you want to get a specific post

### 4. DELETE /posts/:id
Delete specific post and its comment

**Response Format:**
```json
{
    "message": "Post Updated Post Title 123 deleted successfully."
}
```
**Validations:**
- Only Post creator can delete

### Comment Endpoint

### 1. POST /comments
Create new comment on existing post

**Request Body:**
```json
{
  "content": "Test Comment 123",
  "postId": "37"
}
```
**Response Format:**
```json
{
    "content": "Test Comment 123",
    "post": {
        "id": 37,
        "title": "Updated Post Title 123",
        "content": "Updated Post Content 123",
        "authorId": 13,
        "createdAt": "2025-01-10T09:31:44.945Z",
        "updatedAt": "2025-01-10T16:35:44.731Z"
    },
    "id": 10,
    "createdAt": "2025-01-10T09:39:55.301Z",
    "updatedAt": "2025-01-10T09:39:55.301Z"
}
```

### 2. GET /comments/:id
Get specific comment

**Response Format:**
```json
{
    "id": 9,
    "content": "tes komen 21",
    "createdAt": "2025-01-10T06:35:49.428Z",
    "updatedAt": "2025-01-10T06:35:49.428Z",
    "post": {
        "id": 35,
        "title": "Tes Judul 5",
        "content": "Tes Konten 5",
        "authorId": 12,
        "createdAt": "2025-01-10T04:24:49.395Z",
        "updatedAt": "2025-01-10T04:24:49.395Z"
    }
}
```

### 3. PUT /comments/:id
Update existing comment

**Request Body:**
```json
{
  "content": "Test Comment Update 1234"
}
```

**Response Format:**
```json
{
    "id": 9,
    "content": "Test Comment Update 1234",
    "createdAt": "2025-01-10T06:35:49.428Z",
    "updatedAt": "2025-01-11T07:05:15.448Z",
    "post": {
        "id": 35,
        "title": "Tes Judul 5",
        "content": "Tes Konten 5",
        "authorId": 12,
        "createdAt": "2025-01-10T04:24:49.395Z",
        "updatedAt": "2025-01-10T04:24:49.395Z"
    }
}
```

### 4. DELETE /comments/:id
Delete existing comment

**Response Format:**
```json
{
    "message": "Comment deleted successfully."
}
```

## Project Setup
```bash
$ npm install
```

## Compile and Run the Project
```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```
## Technologies Used
- NestJS
- TypeScript
- JWT for authentication
- TypeORM for database interactions

## Tools Used
- Visual Studio Code
- Postman for API testing
- PostgreSql [Aiven.io](https://aiven.io/postgresql)

## Purpose
This project is built to fullfill BLP Backend Internship task. This project demonstrates fundamental backend skills, including RESTful API design, database relationships, and secure authentication. Future enhancements include advanced role-based access control and integration with a front-end application.

