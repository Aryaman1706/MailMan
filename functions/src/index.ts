import express from "express";
import { config } from "dotenv";
import * as functions from "firebase-functions";

config();

import middlewares from "./config/middlewares";
import routes from "./config/routes";

// * Server Init
const app = express();

// * Middlewares
middlewares(app);

// * Routes
routes(app);

// * Deploy Cloud Functions
exports.api = functions.https.onRequest(app);
