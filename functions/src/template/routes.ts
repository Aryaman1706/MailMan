import express from "express";

// * Middlewares
import { middlewares as userMiddlewares } from "../user";
import * as templateValidators from "./middlewares";

// * Controllers
import * as controllers from "./controllers";

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: Create new template with mailLists
 * Route: {{server_url}}/api/template/new
 * Middleware: Admin Login, Multer
 */
router.post(
  "/new",
  userMiddlewares.adminLogin,
  templateValidators.validateNewTemplate,
  controllers.newTemplate
);

/**
 * Type: GET
 * Desc: Get all templates
 * Route: {{server_url}}/api/template/list
 * Middleware: Login
 */
router.get("/list", userMiddlewares.login, controllers.listTemplates);

/**
 * Type: GET
 * Desc: Open a template
 * Route: {{server_url}}/api/template/open/:id
 * Middleware: Login
 */
router.get("/open/:id", userMiddlewares.login, controllers.openTemplate);

/**
 * Type: DELETE
 * Desc: Delete a template
 * Route: {{server_url}}/api/template/delete/:id
 * Middleware: Admin Login
 */
router.delete(
  "/delete/:id",
  userMiddlewares.adminLogin,
  controllers.deleteTemplate
);

/**
 * Type: POST
 * Desc: Upload image to HTML mail template
 * Route: {{server_url}}/api/template/image/upload
 * Middleware: Admin Login, Multer
 */
router.post(
  "/image/upload",
  userMiddlewares.adminLogin,
  controllers.uploadImage
);

// * End of API Endpoints -->

export default router;
