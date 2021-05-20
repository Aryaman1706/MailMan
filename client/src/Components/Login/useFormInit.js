import { string, object } from "yup";

const useFormInit = () => {
  const customMessage = {
    required: "This is a required field.",
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = object({
    email: string().required(customMessage.required),
    password: string().required(customMessage.required),
  });

  return [initialValues, validationSchema];
};

export default useFormInit;
