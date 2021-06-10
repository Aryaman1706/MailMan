import Swal from "sweetalert2";

import { useMutation } from "react-query";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";

const promiseFn = (formData) => {
  const authCred = firebase.auth.EmailAuthProvider.credential(formData);
  return firebase.auth().currentUser.reauthenticateWithCredential(authCred);
};

const useReauthenticate = () => {
  const [reauthenticated, setReauthenticated] = useState(false);
  const history = useHistory();

  const mutation = useMutation("reauthenticateUser", promiseFn, {
    onError: (error) => {
      const errorMsg = error.message || "User Reauthentication failed.";
      setReauthenticated(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      }).then(() => history.push("/profile"));
    },
    onSuccess: (userCred) => {
      console.log(userCred);
      setReauthenticated(true);
    },
  });

  return [mutation, reauthenticated];
};

export default useReauthenticate;
