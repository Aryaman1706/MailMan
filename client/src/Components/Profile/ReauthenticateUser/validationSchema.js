import { string, object } from "yup";

const customMessage = {
  required: "Required.",
  email: "Invalid email.",
};

const validationSchema = object({
  email: string()
    .trim()
    .email(customMessage.email)
    .required(customMessage.required),
  password: string().trim().required(customMessage.required),
});

export default validationSchema;
