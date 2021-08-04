import { Router } from "express";

type RoutesMap = {
  [k: string]: Router;
};

type SetupArray = ("middlewares" | "routes")[];

enum ServerErrors {
  MiddlewaresBeforeRoutes = "Middlewares can not be setuped after Routes.",
}

export { RoutesMap, SetupArray, ServerErrors };
