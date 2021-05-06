import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

// * Routes import
import { router as templateRouter } from "./template";
import { router as mailListRouter } from "./mailList";
import { router as userRouter } from "./user";

// * Server Init
const app = express();

// * Middlewares
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// * Routes
app.use("/api/template", templateRouter);
app.use("/api/mail-list", mailListRouter);
app.use("/api/user", userRouter);

// * Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
