import { Response } from "express";
import { ValidationError } from "joi";

type CompleteData = {
  msg?: string;
  data?: any;
};

type InputData = string | CompleteData | null;

type ResponseData = {
  error: {
    msg: string | null;
    data: any;
  } | null;
  body: {
    msg: string | null;
    data: any;
  } | null;
};

const sendResponse = (
  res: Response,
  status: number,
  error?: InputData,
  body?: InputData
) => {
  const responseData: ResponseData = {
    error: null,
    body: null,
  };

  if (error) {
    responseData.error =
      typeof error === "string"
        ? { msg: error, data: null }
        : { msg: error.msg || null, data: error.data || null };
  }

  if (body) {
    responseData.body =
      typeof body === "string"
        ? { msg: body, data: null }
        : { msg: body.msg || null, data: body.data || null };
  }

  return res.status(status).json(responseData);
};

const serverErrorResponse = (res: Response) =>
  sendResponse(res, 500, "Request failed. Try again.");

const validationErrorResponse = (res: Response, error: ValidationError) =>
  sendResponse(res, 400, {
    msg: "Invalid inputs. Try again.",
    data: error.details[0].message,
  });

export { serverErrorResponse, validationErrorResponse };
export default sendResponse;
