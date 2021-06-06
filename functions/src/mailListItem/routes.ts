import express from "express";

const router = express.Router();

// * API Endpoints -->
/**
 * Type: GET
 * Desc: Download sent mailListItems for a given mailList
 * Route: {{server_url}}/api/mail-list-item/sent/:mailListId
 * Middleware: Login
 */
router.get("/sent/:mailListId");

/**
 * Type: GET
 * Desc: Download unsent mailListItems for a given mailList
 * Route: {{server_url}}/api/mail-list-item/unsent/:mailListId
 * Middleware: Login
 */
router.get("/unsent/:mailListId");

// * End of API Endpoints -->

export default router;
