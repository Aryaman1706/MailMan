import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

type signupReqBody = {
  isAdmin: boolean;
  email: string;
  password: string;
  smtp?: { email?: string; password?: string };
};

export const userSignup = (
  body: any
): CustomValidationResult<signupReqBody> => {
  const schema = Joi.object({
    isAdmin: Joi.boolean().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    smtp: Joi.object({
      email: Joi.string().trim().email(),
      password: Joi.string().trim(),
    }).allow(null),
  });

  return schema.validate(body);
};

export const smtpEdit = (
  body: any
): CustomValidationResult<{ email: string; password: string }> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  });

  return schema.validate(body);
};