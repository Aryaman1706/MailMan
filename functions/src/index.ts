import express from "express";
import { config } from "dotenv";
import * as functions from "firebase-functions";

config();

import middlewares from "./config/middlewares";
import routes from "./config/routes";
// import sendMails from "./cron/sendMails";

// * Server Init
const app = express();

// * Middlewares
middlewares(app);

// * Routes
routes(app);

// * Deploy Cloud Functions
exports.api = functions.region("asia-east2").https.onRequest(app);
// exports.mailer = functions
//   .region("asia-east2")
//   .pubsub.schedule("every 20 minutes")
//   .timeZone("Asia/Kolkata")
//   .onRun((_ctx) => {
//     sendMails()
//       .then(() => {
//         return null;
//       })
//       .catch();
//   });
