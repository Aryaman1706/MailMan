import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useUserStore from "./Stores/userStore";
import useAuthObserver from "./hooks/useAuthObserver";
import Routes from "./Routes";
import Loader from "./Components/Loader";

import RefreshToken from "./Components/RefreshToken";

const selector = (state) => ({
  loading: state.loading,
});

function App() {
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
  const { loading } = useUserStore(selector);
  useAuthObserver();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RefreshToken />
        {loading ? <Loader /> : <Routes />}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
