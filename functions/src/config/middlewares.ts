import { Express, json } from "express";
import cors from "cors";

const middlewares = (app: Express) => {
  // Body parser (application/json)
  app.use(json());

  // Response Headers
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // @ts-ignore
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // CORS Config
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      preflightContinue: true,
    })
  );
};

export default middlewares;
