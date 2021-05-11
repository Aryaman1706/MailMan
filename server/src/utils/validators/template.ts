import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const newTemplate = (
  body: any
): CustomValidationResult<{
  title: string;
  html: string;
  subject: string;
  format: string;
}> => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    subject: Joi.string().trim().required(),
    html: Joi.string().required(),
    format: Joi.string().required(),
  });

  return schema.validate(body);
};

export const validateFormat = (
  body: any
): CustomValidationResult<{
  email: string;
  [k: string]: string;
}> => {
  const schema = Joi.object({
    email: Joi.string().trim().length(1).uppercase().required(),
  }).pattern(Joi.string().trim(), Joi.string().trim().length(1).uppercase());

  return schema.validate(body);
};

export const editTemplate = (
  body: any
): CustomValidationResult<{
  html?: string;
  subject?: string;
  active?: boolean;
}> => {
  const schema = Joi.object({
    html: Joi.string(),
    subject: Joi.string().trim(),
    active: Joi.boolean(),
  });

  return schema.validate(body);
};
