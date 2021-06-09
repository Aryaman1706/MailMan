import { validationErrorResponse } from "../utils/functions/sendResponse";
import * as validators from "./validators";

// Types
import Request from "../utils/types/CustomRequest";
import { Response, NextFunction } from "express";
import { Format } from "./types";

type NewTemplateValid = Omit<validators.NewTemplateBody, "format"> & {
  format: Format;
};

const validateNewTemplate = (
  req: Request<any>,
  res: Response,
  next: NextFunction
) => {
  // Validating req.body
  const { value, error } = validators.newTemplate(req.body);
  if (error) {
    return validationErrorResponse(res, error);
  }

  // Validating format
  const { value: format, error: formatError } = validators.validateFormat(
    JSON.parse(value.format as string)
  );
  if (formatError) {
    return validationErrorResponse(res, formatError);
  }
  value.format = format;

  req.body = value;

  next();
  return;
};

export { validateNewTemplate, NewTemplateValid };
