import Swal from "sweetalert2";

import { useState } from "react";

import { string, object } from "yup";

const useFormHandler = (templates) => {
  const [state, setState] = useState({
    template: null,
    file: null,
  });

  const validationSchema = object({
    templateId: string()
      .trim()
      .oneOf(templates.map((t) => t.id))
      .required(),
  });

  const changeHandler = (e) => {
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
      // Validating form data
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

      // Constructing formData
      const formData = new FormData();
      formData.append("templateId", result.templateId);
      formData.append("file", state.file);

      // Send mutation
      mutate && mutate(formData);

      // Reset form
      setState({
        template: null,
        file: null,
      });
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
