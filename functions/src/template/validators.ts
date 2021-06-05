import Joi from "joi";

// Types
import CustomValidationResult from "../utils/types/CustomValidationResult";
import { Format } from "./types";

type NewTemplateBody = {
  title: string;
  html: string;
  subject: string;
  format: string | Format;
};

const newTemplate = (body: any): CustomValidationResult<NewTemplateBody> => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    subject: Joi.string().trim().required(),
    html: Joi.string().required(),
    format: Joi.string().required(),
    attachments: Joi.any(),
  });

  return schema.validate(body);
};

const validateFormat = (body: any): CustomValidationResult<Format> => {
  const schema = Joi.object({
    email: Joi.string().trim().length(1).uppercase().required(),
  }).pattern(Joi.string().trim(), Joi.string().trim().length(1).uppercase());

  return schema.validate(body);
};

export { newTemplate, NewTemplateBody, validateFormat };
