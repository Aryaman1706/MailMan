import { string, object, boolean } from "yup";

export const initialValues = {
  isAdmin: false,
  email: "",
  password: "",
  smtp_email: "",
  smtp_password: "",
};

const customMessage = {
  required: "This is field is required.",
  email: "Not a valid email.",
};

export const validationSchema = object({
  isAdmin: boolean().required(),
  email: string()
    .trim()
    .email(customMessage.email)
    .required(customMessage.required),
  password: string().trim().required(customMessage.required),
  smtp_email: string().trim().email(customMessage.email),
  smtp_password: string().trim(),
});
