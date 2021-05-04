import express from "express";

// * Controllers

// * Middlewares

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: SignUp a new user
 * Route: {{server_url}}/api/user/signup
 * Middleware: Admin Login
 */
router.post("/signup");

/**
 * Type: PUT
 * Desc: Edit user SMTP settings
 * Route: {{server_url}}/api/user/edit
 * Middleware: User Login
 */
router.put("/edit");

// * End of API Endpoints -->

export default router;
