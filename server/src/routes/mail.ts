import express from "express";

// * Controllers

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
router.post("/mail");

/**
 * Type: POST
 * Desc: Upload images to HTML mail template
 * Route: {{server_url}}/upload
 * Middleware: Multer
 */
router.post("/upload");

// * End of API Endpoints -->
