import express from "express";

// * Middlewares
import { middlewares as userMiddlewares } from "../user";

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
router.post("/new", userMiddlewares.adminLogin, controllers.newTemplate);

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
 * Type: PATCH
 * Desc: Edit a template
 * Route: {{server_url}}/api/template/edit/:id
 * Middleware: Admin Login
 */
router.patch("/edit/:id", userMiddlewares.adminLogin, controllers.editTemplate);

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
