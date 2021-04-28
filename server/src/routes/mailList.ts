import express from "express";

// * Controllers

const router = express.Router();

// * API Endpoints -->
/**
 * Type: PATCH
 * Desc: Edit a mailList item
 * Route: {{server_url}}/api/mail_list/edit/:id
 */
router.patch("/edit/:id");

/**
 * Type: GET
 * Desc: List mailList for a template
 * Route: {{server_url}}/api/mail_list/list/:templateId/?page=1
 */
router.get("/list/:templateId");

// * End of API Endpoints -->
export default router;
