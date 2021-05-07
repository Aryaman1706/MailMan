import express from "express";

// * Controllers
import * as controllers from "./controllers";

// * Middlewares
import { userLogin } from "./middlewares";

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: SignUp a new user/admin
 * Route: {{server_url}}/api/user/signup
 * Middleware: Admin Login
 */
router.post("/signup", controllers.signupUser);

/**
 * Type: GET
 * Desc: Get currentUser profile
 * Route: {{server_url}}/api/user/profile
 * Middleware: User Login
 */
router.get("/profile", userLogin, controllers.getProfile);

/**
 * Type: PUT
 * Desc: Edit user SMTP settings
 * Route: {{server_url}}/api/user/profile
 * Middleware: User Login
 */
router.put("/profile", userLogin, controllers.editUser);

// * End of API Endpoints -->

export default router;
