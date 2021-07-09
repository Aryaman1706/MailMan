import { ObjectSchema } from "joi";

const validation = <T>(schema: ObjectSchema, data: any): string | T => {
  const { value, error } = schema.validate(data);
  if (error) {
    return error.details[0].message;
  }

  return value;
};

export default validation;
