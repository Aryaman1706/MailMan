import Joi from "joi";

const isJoiSchema = (val: any): val is Joi.AnySchema => {
  return Joi.isSchema(val);
};

export { isJoiSchema };
