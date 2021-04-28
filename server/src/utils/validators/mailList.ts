import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

export const listMailList = (
  body: any
): CustomValidationResult<{ page: number }> => {
  const schema = Joi.object({
    page: Joi.number().integer().positive().required(),
  });

  return schema.validate(body);
};

export const editMailList = (
  body: any
): CustomValidationResult<{
  list?: Array<{ [key: string]: string | undefined }>;
}> => {
  const schema = Joi.object({
    list: Joi.array().items(
      Joi.object({
        companyName: Joi.string().trim(),
        country: Joi.string().trim(),
        email: Joi.string().trim().email(),
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
        ref: Joi.string().trim(),
      })
    ),
  });

  return schema.validate(body);
};
