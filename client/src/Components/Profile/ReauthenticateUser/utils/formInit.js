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
    .trim()
    .email(customMessage.email)
    .required(customMessage.required),
  password: string().trim().required(customMessage.required),
});
