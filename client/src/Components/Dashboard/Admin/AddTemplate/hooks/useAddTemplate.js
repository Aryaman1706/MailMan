import Swal from "sweetalert2";

import { useMutation } from "react-query";
import useUserStore from "../../../../../Stores/userStore";

import axios from "../../../../../utils/axios";

const selector = (state) => ({
  idToken: state.idToken,
});

const useAddTemplate = () => {
  const { idToken } = useUserStore(selector);

  const promiseFn = (formData) =>
    axios
      .post("/template/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error?.response?.data || "Request failed.";
      });

  const mutation = useMutation("addTemplate", promiseFn, {
    onError: (error) => {
      const errorMsg = error?.error?.msg || "Request Failed. Try Again.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },
    onSuccess: (response) => {
      const message = response?.body?.msg || "Request successfull.";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: message,
        showConfirmButton: true,
      });
    },
  });

  const submitHandler = (formData) => {
    mutation.mutate(formData);
  };

  return [mutation, submitHandler];
};

export default useAddTemplate;
