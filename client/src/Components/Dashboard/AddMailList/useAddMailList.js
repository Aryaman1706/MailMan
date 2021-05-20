import { useMutation } from "react-query";
import axios from "../../../utils/axios";
import useUserStore from "../../../Stores/userStore";
import Swal from "sweetalert2";

const selector = (state) => ({
  idToken: state.idToken,
});

const useAddMailList = () => {
  const { idToken } = useUserStore(selector);

  const promiseFn = (formData) =>
    axios
      .post("/mail-list", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });

  const mutation = useMutation("addMailList", promiseFn, {
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

export default useAddMailList;
