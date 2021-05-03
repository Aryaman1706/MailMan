import { useMutation } from "react-query";
import firebase from "firebase";
import Swal from "sweetalert2";

const useLoginHandler = () => {
  const promiseFn = ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const mutation = useMutation("login", promiseFn, {
    onError: (error) => {
      const errorMsg = error?.message || "Login failed.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },
    onSuccess: (res) => {
      console.log(res.user);
    },
  });

  return mutation;
};

export default useLoginHandler;
