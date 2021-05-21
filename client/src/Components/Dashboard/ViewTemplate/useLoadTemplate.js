import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import useUserStore from "../../../Stores/userStore";
import Swal from "sweetalert2";

const selector = (state) => ({
  idToken: state.idToken,
});

const useLoadTemplate = () => {
  const { idToken } = useUserStore(selector);
  const { templateId } = useParams();

  const queryFn = () =>
    axios
      .get(`/template/open/${templateId}`, {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err?.response?.data || "Request failed.";
      });

  const query = useQuery(["loadTemplate", templateId], queryFn, {
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

  return [query, query.data?.body?.data || null];
};

export default useLoadTemplate;
