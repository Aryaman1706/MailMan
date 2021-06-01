import express from "express";

// * Middlewares
import { middlewares } from "../user";
import uploadFile from "../utils/multerMiddleware";

// * Controllers
import * as controllers from "./controllers";

const router = express.Router();

// * API Endpoints -->
/**
 * Type: POST
 * Desc: Add a new mailList
 * Route: {{server_url}}/api/mail-list
 * Middleware: Login, File Upload
 */
router.post(
  "/",
  middlewares.login,
  uploadFile.single("file"),
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
router.get("/view/:mailListId", middlewares.login, controllers.viewMailList);

// * End of API Endpoints -->

export default router;
