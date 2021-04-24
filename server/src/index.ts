import express from "express";

// * Server Init
const app = express();

// * Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
