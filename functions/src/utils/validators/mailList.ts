import Joi from "joi";
import CustomValidationResult from "../types/CustomValidationResult";

export const addNew = (
  body: any
): CustomValidationResult<{
  templateId: string;
}> => {
  const schema = Joi.object({
    templateId: Joi.string().trim().required(),
    file: Joi.any(),
  });

  return schema.validate(body);
};

export const pagination = (
  body: any
): CustomValidationResult<{ page: number }> => {
  const schema = Joi.object({
    page: Joi.number().integer().min(0).required(),
  });

  return schema.validate(body);
};
