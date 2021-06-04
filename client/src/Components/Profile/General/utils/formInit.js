import { string, object } from "yup";

export const initialValues = {
  email: "",
  password: "",
};

const customMessage = {
  required: "Required.",
  email: "Invalid email.",
};

export const validationSchema = object({
  email: string()
    .email(customMessage.email)
    .trim()
    .required(customMessage.required),
  password: string().trim().required(customMessage.required),
});
