import express from "express";
import multer from "multer";
import { bucket } from "../config/firebase";
import CustomStorageEngine from "../config/multerStorageEngine";

// * Controllers
import * as controllers from "./controllers";

// * Multer Config
const storage = CustomStorageEngine({
  bucket,
});

const uploadFile = multer({
  storage,
});

const router = express.Router();

// * API Endpoints -->

/**
 * Type: POST
 * Desc: Create new template with mailLists
 * Route: {{server_url}}/api/template/new
 * Middleware: Admin Login, Multer
 */
router.post("/new", uploadFile.array("attachements"), controllers.newTemplate);

/**
 * Type: GET
 * Desc: Get all templates
 * Route: {{server_url}}/api/template/list
 */
router.get("/list", controllers.listTemplates);

/**
 * Type: GET
 * Desc: Open a template
 * Route: {{server_url}}/api/template/open/:id
 */
router.get("/open/:id", controllers.openTemplate);

/**
 * Type: PATCH
 * Desc: Edit a template
 * Route: {{server_url}}/api/template/edit/:id
 */
router.patch("/edit/:id", controllers.editTemplate);

/**
 * Type: POST
 * Desc: Upload image to HTML mail template
 * Route: {{server_url}}/api/template/image/upload
 * Middleware: Multer
 */
router.post(
  "/image/upload",
  uploadFile.single("upload"),
  controllers.uploadImage
);

// * End of API Endpoints -->

export default router;
