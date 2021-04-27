import { useMutation } from "react-query";
import Swal from "sweetalert2";
import axios from "../../utils/axios";

const useSendMails = () => {
  const promiseFn = (formData) => {
    new Promise((resolve, reject) => {
      axios
        .post("/mail", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error.response.data));
    });
  };
  const mutation = useMutation("sendMails", promiseFn, {
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
      const message = response.data.body.msg || "Request successfull.";
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

export default useSendMails;
