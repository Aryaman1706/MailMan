import { string, object } from "yup";

const customMessage = {
  required: "This is a required field.",
};

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = object({
  email: string().required(customMessage.required),
  password: string().required(customMessage.required),
});
