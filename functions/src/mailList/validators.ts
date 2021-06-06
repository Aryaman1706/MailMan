import Joi from "joi";
import CustomValidationResult from "../utils/types/CustomValidationResult";

type AddMailListBody = {
  templateId: string;
};

type PageQuery = {
  page: number;
};

const addNew = (body: any): CustomValidationResult<AddMailListBody> => {
  const schema = Joi.object({
    templateId: Joi.string().trim().required(),
    file: Joi.any(),
  });

  return schema.validate(body);
};

const pagination = (body: any): CustomValidationResult<PageQuery> => {
  const schema = Joi.object({
    page: Joi.number().integer().min(0).required(),
  });

  return schema.validate(body);
};

export { addNew, AddMailListBody, pagination, PageQuery };
