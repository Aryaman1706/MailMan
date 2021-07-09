import { config } from "dotenv";
config();

import * as functions from "firebase-functions";
import server from "./server";
import sendMails from "./cron/sendMails";

// * Deploy Cloud Functions
exports.api = functions.region("asia-east2").https.onRequest(server.getApp());

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
