# ✍️ Snoke Blog Platform API

This project is a TypeScript-based Express application designed to manage a blogging platform where Loged in users can create blog. The creator of the blog while logged in can update, and delete their own blogs. It integrates MongoDB using Mongoose for database operations and ensures data integrity through schema validation. The platform features role-based access control, secure authentication, and a public API for exploring blogs with search, sorting, and filtering functionalities.

## 🚀 Features

1. **User Management**:

   - Register and login functionality for users.
   - Role-based access control (Admin and User roles).
   - Admin can block users and manage their blogs.

2. **Blog Management**:

   - Users can create, retrieve, update, and delete their own blogs.
   - Admins can delete any blog.
   - Blogs include title, content, author details, and timestamps.

3. **Public Blog API**:

   - Fetch blogs with options for search, sorting, and filtering.
   - Search by title or content.
   - Sort blogs by created date, title, or other fields in ascending/descending order.

4. **Authentication & Authorization**:

   - Secure authentication using JWT.
   - Authorization to ensure users can only perform actions permitted by their roles.

5. **Data Validation**:

   - Enforced using Mongoose and zod validation schema.

6. **Error Handling**:

   - Unified error responses with meaningful messages.
   - Handles validation errors, authentication errors, and authorization errors.

7. **API Structure**:
   - Consistent and RESTful API endpoints.
   - Detailed success and error response formats for all API operations.

## 🛠️ Technologies Used

- **Backend Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Mongoose Schema Validation

## 📂 Project Structure

```js
blog-project/
├── src/
│   ├── builder/
│   │   └── QueryBuilder.ts          # Utility for building query strings
│   ├── middlewares/
│   │   ├── auth.ts                  # Middleware for authentication
│   │   ├── errorHandler.ts          # Centralized error handling logic
│   │   ├── handleCastError.ts       # Error handling for invalid object casting
│   │   ├── handleDuplicateError.ts  # Error handling for duplicate keys
│   │   ├── handleStrictMode.ts      # Strict mode error handler
│   │   ├── handleValidationError.ts # Error handling for validation errors
│   │   ├── handleZodError.ts        # Zod validation error handler
│   │   ├── notFound.ts              # Middleware for handling 404 errors
│   │   └── validateData.ts          # Middleware for data validation
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── admin.controller.ts  # Controller logic for admin module
│   │   │   ├── admin.route.ts       # API routes for admin module
│   │   │   └── admin.service.ts     # Business logic for admin module
│   │   ├── auth/
│   │   │   ├── auth.constant.ts     # Constants for authentication module
│   │   │   ├── auth.controller.ts   # Controller logic for authentication module
│   │   │   ├── auth.interface.ts    # TypeScript interfaces for authentication
│   │   │   ├── auth.model.ts        # Mongoose schema for authentication
│   │   │   ├── auth.route.ts        # API routes for authentication module
│   │   │   ├── auth.service.ts      # Business logic for authentication
│   │   │   ├── auth.utils.ts        # Utility functions for authentication
│   │   │   └── auth.validation.ts   # Validation logic for authentication
│   │   └── blog/
│   │       ├── blog.constant.ts     # Constants for blog module
│   │       ├── blog.controller.ts   # Controller logic for blog module
│   │       ├── blog.interface.ts    # TypeScript interfaces for blog
│   │       ├── blog.model.ts        # Mongoose schema for blog
│   │       ├── blog.route.ts        # API routes for blog module
│   │       ├── blog.service.ts      # Business logic for blog
│   │       ├── blog.utils.ts        # Utility functions for blog module
│   │       └── blog.validation.ts   # Validation logic for blog module
│   ├── routes/
│   │   ├── index.ts                 # Main application routes
│   │   └── routes.ts                # Additional route definitions
│   ├── types-interface/
│   │   ├── defined.interface.ts     # Defined TypeScript interfaces
│   │   ├── err.ts                   # Error-related types or utilities
│   │   └── typesInterface.ts        # Additional interface types
│   ├── utils/
│   │   ├── catchAsync.ts            # Utility for handling async functions with error handling
│   │   └── error.class.ts           # Custom error class
├── .env                              # Environment variables
├── package.json                      # Node.js dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Documentation

```

## 🧩 Models Overview

### **User Model**

| Field       | Type      | Description                              |
| ----------- | --------- | ---------------------------------------- |
| `name`      | `string`  | Name of the user.                        |
| `email`     | `string`  | User's email address (unique).           |
| `password`  | `string`  | Encrypted password of the user.          |
| `role`      | `enum`    | Role of the user (`Admin` or `User`).    |
| `isBlocked` | `boolean` | Indicates if the user is blocked.        |
| `createdAt` | `Date`    | Timestamp for when the user was created. |
| `updatedAt` | `Date`    | Timestamp for the last update.           |

### **Blog Model**

| Field         | Type       | Description                              |
| ------------- | ---------- | ---------------------------------------- |
| `title`       | `string`   | Title of the blog.                       |
| `content`     | `string`   | Main content of the blog.                |
| `author`      | `ObjectId` | Reference to the User who created it.    |
| `createdAt`   | `Date`     | Timestamp for when the blog was created. |
| `updatedAt`   | `Date`     | Timestamp for the last update.           |
| `isPublished` | `boolean`  | Whether the blog is published or not.    |

## 📋 API Endpoints

### **Users**

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| POST   | `/api/users/register` | Register a new user.              |
| POST   | `/api/users/login`    | User login to receive a token.    |
| GET    | `/api/users/profile`  | Retrieve user profile (auth req). |
| PUT    | `/api/users/:userId`  | Update user details.              |
| DELETE | `/api/users/:userId`  | Delete a user account.            |

### **Blogs**

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/api/blogs`                | Create a new blog post.                  |
| GET    | `/api/blogs`                | Retrieve all blog posts.                 |
| GET    | `/api/blogs/:blogId`        | Retrieve a specific blog post.           |
| PUT    | `/api/blogs/:blogId`        | Update a blog post.                      |
| DELETE | `/api/blogs/:blogId`        | Delete a blog post.                      |
| GET    | `/api/blogs/author/:userId` | Retrieve all blogs by a specific author. |

## 🛡️ Error Handling

- **Validation Errors**: Detailed messages for invalid inputs.
- **Resource Not Found**: 404 errors for missing users, blog posts, or invalid endpoints.
- **Authentication Errors**: 401 errors for unauthorized access to protected routes.
- **Duplicate Entry**: Prevents the creation of duplicate users or blogs with conflicting data.

Example Error Response:

```js
{
   "message": "Validation failed",
   "success": false,
   "statusCode":200,
   "errors": {
      "email": "Email is already in use",
      "password": "Password must be at least 8 characters"
   },
   "stack": "Error trace..."
}
```

## 🛑 Prerequisites

- Node.js (v16+)
- MongoDB (Atlas or Local)
- npm

## 🔧 Setup

1. Clone the repository:

   `git clone https://github.com/snokeOver/snoke-blog.git`

   `cd snoke-blog`

2. Install dependencies:

   `npm install`

3. Set up environment variables:

   Create a `.env` file with the following values:

   `SERVER_PORT=5000`
   `MONGODB_URL=your_mongodb_connection_string`
   `NODE_ENV=development`
   `SALT_ROUND=Your_Preferred_Round`
   `JWT_SECRET=Your_Preferred_JWT_Secret`
   `JWT_REFRESH_SECRET=Your_JWT_Refresh_Secret`
   `JWT_ACCESS_EXPIRES_IN=Your_Preferred_Time`
   `JWT_REFRESH_EXPIRES_IN=Your_Preferred_Time`

4. Start the application:

   `npm run dev`

5. Test the API using tools like `Postman` or `cURL`.

## 🖥️ Deployment

- Deployed Link: [Live Demo](https://snoke-blog.vercel.app/)
- GitHub Repository: [Stationery Shop](https://github.com/snokeOver/snoke-blog)

## 🎥 Video Walkthrough

Watch the API walkthrough: [Video Explanation](https://drive.google.com/file/d/1zrUaz9p_1wLizJyeCNaxxy9f-x3_VcWU/view)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the **Issues** page or submit a pull request.

## 👨‍💻 Author

**Shubhankar Halder**
**_ Software Engineer, Nagorik Technology Ltd._**

###### MERN, TypeScript, Next.js, Node.js | Crafting user-friendly, secure, scalable Web Apps | Passionate about Software Engineering

- GitHub: [@snokeOver](https://github.com/snokeOver)
- LinkedIn: [Shubhankar Halder](https://www.linkedin.com/in/shubhankar-halder/)
