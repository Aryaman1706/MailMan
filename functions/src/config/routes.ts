import { Express } from "express";
import { router as templateRouter } from "../template";
import { router as mailListRouter } from "../mailList";
import { router as userRouter } from "../user";

const routes = (app: Express) => {
  app.use("/template", templateRouter);
  app.use("/mail-list", mailListRouter);
  app.use("/user", userRouter);
};

export default routes;
