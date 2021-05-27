import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      refetchOnWindowFocus: true,
      retry: 2,
      retryDelay: 500,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default queryClient;
