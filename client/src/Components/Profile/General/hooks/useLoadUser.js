import Swal from "sweetalert2";

import { useQuery } from "react-query";
import useUserStore from "../../../../Stores/userStore";

import axios from "../../../../utils/axios";

const selector = (state) => ({
  idToken: state.idToken,
});

const useLoadUser = () => {
  const { idToken } = useUserStore(selector);

  const queryFn = () =>
    axios
      .get("/user/profile", {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err?.response?.data || "Request failed.";
      });

  const query = useQuery("userProfile", queryFn, {
    enabled: !!idToken,
    onError: (error) => {
      const errorMsg = error?.error?.msg || "Request Failed. Try Again.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: errorMsg,
        showConfirmButton: true,
      });
    },
  });

  return query;
};

export default useLoadUser;
