import express from "express";

// Middlewares
import { middlewares } from "../user";
import validationMiddleware from "../utils/functions/validationMiddleware";
import uploadFile from "../config/fileUpload";

// Controllers
import * as controllers from "./controllers";

// Utils
import { addNew } from "./validators";

const router = express.Router();

// * API Endpoints -->
/**
 * Type: POST
 * Desc: Add a new mailList
 * Route: {{server_url}}/api/mail-list
 * Middleware: Login, UploadFile
 */
router.post(
  "/",
  middlewares.login,
  uploadFile,
  validationMiddleware(addNew),
  controllers.addNew
);

/**
 * Type: GET
 * Desc: Get all mailLists
 * Route: {{server_url}}/api/mail-list/full-list?page=1
 * Middleware: Admin Login
 */
router.get("/full-list", middlewares.adminLogin, controllers.listMailList);

/**
 * Type: GET
 * Desc: Get all mailLists of a user
 * Route: {{server_url}}/api/mail-list/list?page=1
 * Middleware: Login
 */
router.get("/list", middlewares.login, controllers.listMailListUser);

/**
 * Type: GET
 * Desc: View a mailList
 * Route: {{server_url}}/api/mail-list/view/:mailListId
 * Middleware: Login
 */
router.get("/view/:id", middlewares.login, controllers.viewMailList);

// * End of API Endpoints -->

export default router;
