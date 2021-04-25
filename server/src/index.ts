import express from "express";
import mail from "./routes/mail";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

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
app.use("/api", mail);

// * Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
