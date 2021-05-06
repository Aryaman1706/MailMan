import express from "express";

// * Controllers
import * as controllers from "./controllers";

// * Middlewares
import { userLogin } from "./middlewares";

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: SignUp a new user
 * Route: {{server_url}}/api/user/signup
 * Middleware: Admin Login
 */
router.post("/signup", controllers.signupUser);

/**
 * Type: PUT
 * Desc: Edit user SMTP settings
 * Route: {{server_url}}/api/user/edit
 * Middleware: User Login
 */
router.put("/edit", userLogin, controllers.editUser);

// * End of API Endpoints -->

export default router;
