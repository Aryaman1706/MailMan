import express from "express";
import { config } from "dotenv";

config();

import middlewares from "./config/middlewares";
import routes from "./config/routes";

// * Server Init
const app = express();

// * Middlewares
middlewares(app);

// * Routes
routes(app);

// * Start Server
app.listen(5000, () => console.log("Server started.."));
