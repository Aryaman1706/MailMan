import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const useLoginHandler = (formikProps) => {
  const history = useHistory();

  const {
    values: { email, password },
    handleChange,
    setFieldTouched,
    isValid,
  } = formikProps;

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
    onSuccess: () => {
      history.push("/");
    },
  });

  const changeHandler = (e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };

  const submitHandler = () => {
    if (isValid) {
      mutation.mutate({ email, password });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Inputs",
        text: "Input values are not in required format.",
        showConfirmButton: true,
      });
    }
  };

  return [mutation, changeHandler, submitHandler];
};

export default useLoginHandler;
