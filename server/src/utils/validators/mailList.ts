import Joi from "joi";
import CustomValidationResult from "./customValidationResult";

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
