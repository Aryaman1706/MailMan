import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useUserStore from "./Stores/userStore";
import useAuthObserver from "./hooks/useAuthObserver";
import queryClient from "./utils/queryClient";

import Routes from "./Routes";
import Loader from "./Components/Loader";
import RefreshToken from "./Components/RefreshToken";

const selector = (state) => ({
  loading: state.loading,
});

function App() {
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
