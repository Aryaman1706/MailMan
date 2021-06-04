import Swal from "sweetalert2";

import { useMutation } from "react-query";
import useUserStore from "../../../../../Stores/userStore";

import axios from "../../../../../utils/axios";

const selector = (state) => ({
  idToken: state.idToken,
});

const useSignupUser = (formikProps) => {
  const { idToken } = useUserStore(selector);
  const {
    values: { email, password, smtp_email, smtp_password, isAdmin },
    resetForm,
    isValid,
    setFieldTouched,
    setFieldValue,
    handleChange,
  } = formikProps;

  const promiseFn = (inputData) =>
    axios
      .post("/user/signup", inputData, {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err?.response?.data || "Request failed.";
      });

  const mutation = useMutation("signupUser", promiseFn, {
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

  const changeHandler = (e) => {
    if (e.target.name === "isAdmin") {
      setFieldValue("isAdmin", e.target.checked, false);
    } else {
      handleChange(e);
    }
    setFieldTouched(e.target.name, true, false);
  };

  const submitHandler = () => {
    if (!isValid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Inputs",
        text: "Input values are not in required format.",
        showConfirmButton: true,
      });
    } else {
      const inputData = {
        isAdmin,
        email,
        password,
      };
      inputData.smtp =
        !smtp_email && !smtp_password
          ? null
          : { email: smtp_email || null, password: smtp_password || null };

      mutation.mutate(inputData);
    }
  };

  return [mutation, changeHandler, submitHandler];
};

export default useSignupUser;
