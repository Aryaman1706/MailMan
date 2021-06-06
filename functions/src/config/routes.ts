import { Express } from "express";
import { router as templateRouter } from "../template";
import { router as mailListRouter } from "../mailList";
import { router as userRouter } from "../user";

const routes = (app: Express, prefix?: string) => {
  app.use(prefix ? `${prefix}/template` : "/template", templateRouter);
  app.use(prefix ? `${prefix}/mail-list` : "/mail-list", mailListRouter);
  app.use(prefix ? `${prefix}/user` : "/user", userRouter);
};

export default routes;
