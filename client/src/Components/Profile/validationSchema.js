import { string, object } from "yup";

const customMessage = {
  required: "Required.",
  email: "Invalid email.",
};

const validationSchema = object({
  email: string()
    .email(customMessage.email)
    .trim()
    .required(customMessage.required),
  password: string().trim().required(customMessage.required),
});

export default validationSchema;
