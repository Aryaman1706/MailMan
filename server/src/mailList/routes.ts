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
 * Middleware: Login, Multer
 */
router.post(
  "/",
  middlewares.login,
  uploadFile.single("file"),
  controllers.addNew
);

// * End of API Endpoints -->

export default router;
