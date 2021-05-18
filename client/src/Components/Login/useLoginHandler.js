import { useMutation } from "react-query";
import firebase from "firebase";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const useLoginHandler = () => {
  const promiseFn = ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const history = useHistory();

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
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((user) => {
          history.push(user.claims.admin ? "/admin/dashboard" : "/dashboard");
        });
    },
  });

  return mutation;
};

export default useLoginHandler;
