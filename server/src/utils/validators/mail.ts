import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const sendMails = (
  body: any
): CustomValidationResult<{ html: string; subject: string }> => {
  const schema = Joi.object({
    subject: Joi.string().required().trim(),
    html: Joi.string().required(),
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
