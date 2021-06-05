import { validationErrorResponse } from "./sendResponse";

import Request from "../types/CustomRequest";
import { Response, NextFunction } from "express";
import CustomValidationResult from "../types/CustomValidationResult";

const validationMiddleware = <T>(
  validationFunc: (body: any) => CustomValidationResult<T>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validationFunc(req.body);
    if (error) {
      return validationErrorResponse(res, error);
    }

    req.body = value;

    next();
    return;
  };
};

export default validationMiddleware;
