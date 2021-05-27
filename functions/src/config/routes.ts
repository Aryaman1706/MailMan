import { Express } from "express";
import { router as templateRouter } from "../template";
import { router as mailListRouter } from "../mailList";
import { router as userRouter } from "../user";

const routes = (app: Express) => {
  app.use("/api/template", templateRouter);
  app.use("/api/mail-list", mailListRouter);
  app.use("/api/user", userRouter);
};

export default routes;
