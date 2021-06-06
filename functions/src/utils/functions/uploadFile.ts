// @ts-nocheck

import Busboy from "busboy";

import Request from "../types/CustomRequest";
import { Response, NextFunction } from "express";
import { Options } from "multer";

type KeyValue = { [key: string]: string };

const uploadFile = (config: Options) => {
  const middleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const busboyConfig: busboy.BusboyConfig = {
        headers: req.headers,
      };
      if (config.limits) {
        busboyConfig["limits"] = config.limits;
      }

      const busboy = new Busboy({
        ...busboyConfig,
        preservePath: config.preservePath || false,
      });

      const fields: KeyValue = {};
    } catch (error) {
      console.error(error);
    }
  };

  return middleware;
};
