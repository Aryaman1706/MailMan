import { useMutation } from "react-query";
import Swal from "sweetalert2";
import axios from "../../../../utils/axios";

const useAddTemplate = () => {
  const promiseFn = (formData) =>
    new Promise((resolve, reject) => {
      axios
        .post("/template/new", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => reject(error.response.data));
    });
  const mutation = useMutation("addTemplate", promiseFn, {
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

  const submitHandler = (formData) => {
    mutation.mutate(formData);
  };

  return [mutation, submitHandler];
};

export default useAddTemplate;
