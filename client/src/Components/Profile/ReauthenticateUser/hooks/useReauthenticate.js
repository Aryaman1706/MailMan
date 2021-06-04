import Swal from "sweetalert2";

import { useMutation } from "react-query";

import firebase from "firebase/app";
import "firebase/auth";

const promiseFn = (formData) => {
  const authCred = firebase.auth.EmailAuthProvider.credential(formData);
  return firebase.auth().currentUser.reauthenticateWithCredential(authCred);
};

const useReauthenticate = () => {
  const mutation = useMutation("reauthenticateUser", promiseFn, {
    onError: (error) => {
      const errorMsg = error.message || "User Reauthentication failed.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },
  });

  return mutation;
};

export default useReauthenticate;
