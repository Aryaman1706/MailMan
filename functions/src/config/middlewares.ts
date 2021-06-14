import { Express, json } from "express";
import cors from "cors";

const middlewares = (app: Express) => {
  // Body parser (application/json)
  app.use(json());

  // CORS Config
  app.use(
    cors({
      origin: [
        "https://www.mailer.absoluteveritas.com",
        "https://av-mailer-01.web.app",
        "http://localhost:3000",
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
      credentials: true,
      preflightContinue: true,
    })
  );
};

export default middlewares;
