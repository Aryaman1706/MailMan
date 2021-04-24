import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const sendMails = (
  body: any
): CustomValidationResult<{ html: string }> => {
  const schema = Joi.object({
    html: Joi.string().required(),
  });

  return schema.validate(body);
};
