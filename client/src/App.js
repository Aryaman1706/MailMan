import Routes from "./Routes";
import Loader from "./Components/Loader";
import RefreshToken from "./Components/RefreshToken";

import useUserStore from "./Stores/userStore";
import useAuthObserver from "./hooks/useAuthObserver";

import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./utils/queryClient";

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

/**
 * Remember to attribute
 * <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 */
