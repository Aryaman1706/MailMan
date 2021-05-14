import { useQuery } from "react-query";
import axios from "../../utils/axios";
import Swal from "sweetalert2";
import useUserStore from "../../Stores/userStore";

const selector = (state) => ({
  idToken: state.idToken,
});

const useTemplateList = () => {
  const { idToken } = useUserStore(selector);

  const queryFn = () =>
    axios
      .get("/template/list", {
        headers: {
          "auth-id-token": idToken || "",
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });

  const query = useQuery("listTemplates", queryFn, {
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 500,
    staleTime: Infinity,
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
  });

  return query;
};

export default useTemplateList;
