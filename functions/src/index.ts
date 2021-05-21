import express from "express";
import cors from "cors";
import { config } from "dotenv";
import * as functions from "firebase-functions";

config();

// * Routes import
import { router as templateRouter } from "./template";
import { router as mailListRouter } from "./mailList";
import { router as userRouter } from "./user";

// * Server Init
const app = express();

// * Middlewares
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// * Routes
app.use("/template", templateRouter);
app.use("/mail-list", mailListRouter);
app.use("/user", userRouter);

import sendMails from "./cron/sendMails";

// exports.api = functions.region("asia-east2").https.onRequest(app);
exports.sendMails = functions
  .region("asia-east2")
  .pubsub.schedule("every 20 minutes")
  .timeZone("Asia/Kolkata")
  .onRun((_context) => {
    sendMails();
    return null;
  });

// app.listen(process.env.PORT, () => console.log("Server started.."));
