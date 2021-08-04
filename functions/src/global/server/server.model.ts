import express, { Express, RequestHandler } from "express";
import { RoutesMap, SetupArray, ServerErrors } from "./server.types";

class Server {
  private app: Express;
  private setup: SetupArray;

  constructor() {
    this.app = express();
    this.setup = [];
  }

  public setupMiddlewares = (middlewares: RequestHandler[]) => {
    if (this.setup.includes("routes")) {
      throw new Error(ServerErrors.MiddlewaresBeforeRoutes);
    }

    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });

    this.setup.push("middlewares");
  };

  public setupRoutes = (routesMap: RoutesMap, prefix?: string) => {
    Object.keys(routesMap).forEach((apiPath) => {
      this.app.use(
        prefix ? `${prefix}${apiPath}` : apiPath,
        routesMap[apiPath]
      );
    });

    this.setup.push("routes");
  };

  public getApp(): Express {
    return this.app;
  }
}

export default Server;
