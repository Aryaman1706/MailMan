import { string, object, array } from "yup";

const customMessage = {
  required: "Required.",
  min: "Field must contain more than one row.",
  oneChar: "cell should be of only one alphabet.",
  cell: "must be an alphabet",
  field: "must be a combination of alphabet, digit, _ or -",
};

export const initialValues = {
  title: "",
  subject: "",
  html: "",
  format: [
    {
      field: "email",
      cell: "",
    },
  ],
};

export const validationSchema = object({
  title: string().trim().required(customMessage.required),
  subject: string().trim().required(customMessage.required),
  html: string().trim().required(),
  format: array()
    .of(
      object({
        field: string()
          .trim()
          .matches(/^[(a-z)(0-9)_-]+$/i, customMessage.field)
          .required(customMessage.required),
        cell: string()
          .trim()
          .matches(/^[a-z]{1}$/i, customMessage.cell)
          .length(1, customMessage.oneChar)
          .uppercase()
          .required(customMessage.required),
      })
    )
    .min(1, customMessage.min)
    .required(customMessage.required),
});
