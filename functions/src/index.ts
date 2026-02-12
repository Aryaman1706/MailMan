import { config } from "dotenv";
config();

import * as functions from "firebase-functions";
import cors from "cors";
import server from "./server";
import sendMails from "./cron/sendMails";

// * CORS configuration for Firebase Cloud Functions
const corsOptions = {
  origin: [
    "https://www.mailer.absoluteveritas.com",
    "https://av-mailer-01.web.app",
    "http://localhost:3000",
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "auth-id-token"],
  credentials: true,
  preflightContinue: false,
};

// * Deploy Cloud Functions
exports.api = functions.region("asia-east2").https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    server.getApp()(req, res);
  });
});

exports.mailer = functions
  .region("asia-east2")
  .pubsub.schedule("every 20 minutes")
  .timeZone("Asia/Kolkata")
  .onRun((_ctx) => {
    console.log("===========CRON JOB STARTED==========");
    sendMails()
      .then(() => {
        return null;
      })
      .catch((err: Error) => {
        console.error(err);
        return null;
      });
  });
