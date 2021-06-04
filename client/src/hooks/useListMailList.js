import { useState } from "react";
import { useQuery } from "react-query";
import useUserStore from "../Stores/userStore";

const selector = (state) => ({
  idToken: state.idToken,
});

const useList = (promiseFn) => {
  const { idToken } = useUserStore(selector);
  const [page, setPage] = useState(0);

  const query = useQuery(["listMailList", page], () => promiseFn(page), {
    keepPreviousData: true,
    enabled: !!idToken,
  });

  const nextPage = () => {
    if (!query.isPreviousData && query.data?.body.data.hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return [query, page, nextPage, prevPage];
};

export default useList;
