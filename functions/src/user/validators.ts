import Joi from "joi";
import CustomValidationResult from "../utils/types/CustomValidationResult";

type UserSignupBody = {
  isAdmin: boolean;
  email: string;
  password: string;
  smtp: { email: string | null; password: string | null } | null;
};

type SmtpBody = {
  email: string;
  password: string;
};

const userSignup = (body: any): CustomValidationResult<UserSignupBody> => {
  const schema = Joi.object({
    isAdmin: Joi.boolean().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    smtp: Joi.object({
      email: Joi.string().trim().email().allow(null).default(null),
      password: Joi.string().trim().allow(null).default(null),
    })
      .allow(null)
      .default(null),
  });

  return schema.validate(body);
};

const smtpEdit = (body: any): CustomValidationResult<SmtpBody> => {
  const schema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
  });

  return schema.validate(body);
};

export { userSignup, UserSignupBody, smtpEdit, SmtpBody };
