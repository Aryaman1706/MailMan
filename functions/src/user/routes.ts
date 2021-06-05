import express from "express";

// Controllers
import * as controllers from "./controllers";

// Middlewares
import { login, adminLogin } from "./middlewares";
import validationMiddleware from "../utils/functions/validationMiddleware";

// Types
import { userSignup, smtpEdit } from "./validators";

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: SignUp a new user/admin
 * Route: {{server_url}}/api/user/signup
 * Middleware: Admin Login
 */
router.post(
  "/signup",
  adminLogin,
  validationMiddleware(userSignup),
  controllers.signupUser
);

/**
 * Type: GET
 * Desc: Get currentUser profile
 * Route: {{server_url}}/api/user/profile
 * Middleware: Login
 */
router.get("/profile", login, controllers.getProfile);

/**
 * Type: PUT
 * Desc: Edit user SMTP settings
 * Route: {{server_url}}/api/user/profile
 * Middleware: Login
 */
router.put(
  "/profile",
  login,
  validationMiddleware(smtpEdit),
  controllers.editUser
);

// * End of API Endpoints -->

export default router;
