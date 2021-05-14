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

export default useEditSmtp;
