import { string, object, array } from "yup";

const customMessage = {
  required: "Required.",
  min: "Field must contain more than one row.",
  oneChar: "cell should be of only one alphabet.",
};

const validationSchema = object({
  title: string().trim().required(customMessage.required),
  subject: string().trim().required(customMessage.required),
  html: string().trim().required(),
  format: array()
    .of(
      object({
        field: string().trim().required(customMessage.required),
        cell: string()
          .trim()
          .length(1, customMessage.oneChar)
          .uppercase()
          .required(customMessage.required),
      })
    )
    .min(1, customMessage.min)
    .required(customMessage.required),
});

export default validationSchema;
