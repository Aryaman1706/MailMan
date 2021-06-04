import Swal from "sweetalert2";

import { useState } from "react";
import { useQuery } from "react-query";
import useUserStore from "../Stores/userStore";

import axios from "../utils/axios";

const selector = (state) => ({
  idToken: state.idToken,
});

const useTemplateList = () => {
  const { idToken } = useUserStore(selector);
  const [templates, setTemplates] = useState(null);

  const queryFn = () =>
    axios
      .get("/template/list", {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err?.response?.data || "Request failed.";
      });

  const query = useQuery("listTemplates", queryFn, {
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
      setTemplates(null);
    },
    onSuccess: (data) => {
      setTemplates(data.body.data);
    },
  });

  return [query, templates];
};

export default useTemplateList;
