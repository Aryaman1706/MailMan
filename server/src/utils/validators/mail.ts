import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const sendMails = (
  body: any
): CustomValidationResult<{ html: string; subject: string }> => {
  const schema = Joi.object({
    subject: Joi.string().required(),
    html: Joi.string().required(),
  });

  return schema.validate(body);
};
