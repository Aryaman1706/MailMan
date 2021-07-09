import { RequestHandler, json } from "express";
import cors from "cors";
import { Server, types } from "./global/server";

import { router as templateRouter } from "./template";
import { router as mailListRouter } from "./mailList";
import { router as userRouter } from "./user";

const server = new Server();

const middlewares: RequestHandler[] = [
  json(),
  cors({
    origin: [
      "https://www.mailer.absoluteveritas.com",
      "https://av-mailer-01.web.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
    preflightContinue: true,
  }),
];

const routes: types.RoutesMap = {
  "/template": templateRouter,
  "/mail-list": mailListRouter,
  "/user": userRouter,
};

server.setupMiddlewares(middlewares);
server.setupRoutes(routes);

export default server;
