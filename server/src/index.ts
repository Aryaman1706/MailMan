import express from "express";
import mail from "./routes/mail";

// * Server Init
const app = express();

// * Middlewares
app.use(express.json());

// * Routes
app.use("/api", mail);

// * Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
