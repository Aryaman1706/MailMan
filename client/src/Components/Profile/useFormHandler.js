import { useState } from "react";
import validationSchema from "./validationSchema";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import axios from "../../utils/axios";

const promiseFn = (formData) =>
  axios
    .put("/user/profile", formData)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data;
    });

const useEditSmtp = () => {
  const mutation = useMutation("editSMTP", promiseFn, {
    onError: (error) => {
      const errorMsg = error.error.msg || "Request Failed. Try Again.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },
    onSuccess: (response) => {
      const message = response.body.msg || "Request successfull.";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
      });
    },
  });

  return mutation;
};

const useFormHandler = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const mutation = useEditSmtp();

  const changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    try {
      const result = await validationSchema.validate(state);
      mutation.mutate(result);
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

  return [state, changeHandler, submitHandler, mutation];
};

export default useFormHandler;
