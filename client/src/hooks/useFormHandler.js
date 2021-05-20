import { useState } from "react";
import Swal from "sweetalert2";

const useFormHandler = (initialValues, validationSchema) => {
  const [state, setState] = useState(initialValues);

  const changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (mutate) => {
    try {
      const result = await validationSchema.validate(state);
      mutate && mutate(result);
    } catch (error) {
      const errorMsg = error.errors[0] || "Invalid inputs.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    }
  };

  return [state, changeHandler, submitHandler, setState];
};

export default useFormHandler;
