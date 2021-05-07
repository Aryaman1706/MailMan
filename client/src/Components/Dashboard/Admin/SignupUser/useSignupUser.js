import { useMutation } from "react-query";
import Swal from "sweetalert2";
import axios from "../../../../utils/axios";

const useSignupUser = (resetForm) => {
  const promiseFn = (inputData) =>
    new Promise((resolve, reject) => {
      axios
        .post("/user/signup", inputData)
        .then((response) => resolve(response.data))
        .catch((error) =>
          reject(
            error?.response?.data || {
              body: null,
              error: {
                msg: "Request failed. Try again.",
                data: null,
              },
            }
          )
        );
    });

  const mutation = useMutation("signup_user", promiseFn, {
    onError: (error) => {
      const errorMsg = error?.error?.msg || "Signup unsuccessful.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },

    onSuccess: (res) => {
      const message = res?.body?.msg || "User created successfully.";
      resetForm();
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

export default useSignupUser;
