import express from "express";

// * Controllers
import * as controllers from "./controllers";

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
router.get("/list/:templateId", controllers.listMailList);

// * End of API Endpoints -->

export default router;