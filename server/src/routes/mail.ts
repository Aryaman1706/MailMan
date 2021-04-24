import express from "express";
import multer from "multer";
import { bucket } from "../config/firebase";
import CustomStorageEngine from "../config/multerStorageEngine";

// * Controllers
import { sendMails, uploadImage } from "../controllers/mail";

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
 * Desc: Enter email template and file to send emails
 * Route: {{server_url}}/mail
 * Middleware: Multer
 * Request Body: {
 *  "html": "<p>Mail Template</p>"
 * }
 */
router.post("/mail", uploadFile.single("file"), sendMails);

/**
 * Type: POST
 * Desc: Upload image to HTML mail template
 * Route: {{server_url}}/upload
 * Middleware: Multer
 */
router.post("/upload", uploadFile.single("image"), uploadImage);

// * End of API Endpoints -->
export default router;
