import useAddTemplate from "./useAddTemplate";

const useFormHandler = (formikProps) => {
  const [mutation, submitForm] = useAddTemplate();

  const changeHandler = (e) => {
    formikProps.setFieldValue(e.target.name, e.target.value);
  };

  const editorChangeHandler = (editor) => {
    formikProps.setFieldValue("html", editor.getData());
  };

  const blurHandler = async (e, validationSchema) => {
    if (validationSchema) {
      try {
        await validationSchema.validateAt(e.target.name, formikProps.values);
        formikProps.setFieldError(e.target.name, undefined);
      } catch (error) {
        formikProps.setFieldError(e.target.name, error?.errors?.[0]);
      }
    } else {
      formikProps.validateField(e.target.name);
    }
    formikProps.setFieldTouched(e.target.name, true, false);
  };

  const showErrors = (errors) => {
    Object.keys(errors).forEach((field) => {
      if (field.trim() === "format" && typeof errors.format !== "string") {
        errors.format.forEach((obj, index) => {
          if (obj) {
            formikProps.setFieldTouched(`format[${index}].field`, true, false);
            formikProps.setFieldTouched(`format[${index}].cell`, true, false);
          }
        });
      } else {
        formikProps.setFieldTouched(field.toString(), true, false);
      }
    });
  };

  const submitHandler = async (attachements = []) => {
    const errors = await formikProps.validateForm();
    if (Object.keys(errors).length === 0) {
      const format = {};
      formikProps.values.format.forEach((obj) => {
        format[obj.field] = obj.cell;
      });

      const formData = new FormData();
      formData.append("title", formikProps.values.title);
      formData.append("subject", formikProps.values.subject);
      formData.append("html", formikProps.values.html);
      formData.append("format", JSON.stringify(format));
      formData.append("attachments", attachements);

      submitForm(formData);
      formikProps.resetForm();
    } else {
      showErrors(errors);
    }
  };

  return [
    mutation,
    changeHandler,
    editorChangeHandler,
    blurHandler,
    submitHandler,
  ];
};

export default useFormHandler;
