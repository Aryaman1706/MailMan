import { string, object } from "yup";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useFormHandler = (templates) => {
  const [state, setState] = useState({
    template: null,
    file: null,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  const validationSchema = object({
    templateId: string()
      .trim()
      .oneOf(templates.map((t) => t.id))
      .required(),
  });

  const changeHandler = (e) => {
    console.log("changeHandler");
    if (e.target.name.trim() === "file") {
      setState((prev) => ({
        ...prev,
        file: e.target.files[0],
      }));
    } else {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const submitHandler = async (mutate) => {
    try {
      if (!state.file || !state.template) {
        throw new Error(
          state.template
            ? "An excel file must be provided."
            : "Please select a template."
        );
      }

      const result = await validationSchema
        .validate({
          templateId: state.template.id,
        })
        .catch((err) => {
          throw new Error(err.errors[0]);
        });

      mutate && mutate({ templateId: result.templateId, file: state.file });
    } catch (error) {
      const errorMsg = error.message || "Invalid inputs.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    }
  };

  const fileClear = (e) => {
    setState((prev) => ({
      ...prev,
      file: null,
    }));
  };

  return [state, changeHandler, submitHandler, fileClear];
};

export default useFormHandler;
