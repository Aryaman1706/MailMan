import Swal from "sweetalert2";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useUserStore from "../../../../Stores/userStore";

import axios from "../../../../utils/axios";

const selector = (state) => ({
  idToken: state.idToken,
});

const useGetMailList = () => {
  const { idToken } = useUserStore(selector);
  const { mailListId } = useParams();

  const queryFn = () =>
    axios
      .get(`/mail-list/view/${mailListId}`, {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err?.response?.data || "Request failed.";
      });

  const query = useQuery(["viewMailList", mailListId], queryFn, {
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

export default useGetMailList;
