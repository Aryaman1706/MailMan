import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const newTemplate = (
  body: any
): CustomValidationResult<{
  html: string;
  subject: string;
  format: { email: string; [key: string]: string };
}> => {
  const schema = Joi.object({
    subject: Joi.string().required().trim(),
    html: Joi.string().required(),
    format: Joi.object({
      email: Joi.string().trim().length(1).required(),
    })
      .pattern(Joi.string().trim(), Joi.string().trim().length(1))
      .required(),
  });

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
