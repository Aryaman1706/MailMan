import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import firebase from "firebase";
import useUserStore from "./Stores/userStore";
import { useEffect } from "react";
import Routes from "./Routes";
import Loader from "./Components/Loader";

const selector = (state) => ({
  loading: state.loading,
  setState: state.setState,
});

function App() {
  const queryClient = new QueryClient();
  const userStore = useUserStore(selector);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("firebase auth observer");
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          userStore.setState(
            false,
            user.uid,
            Boolean(idTokenResult.claims.admin),
            idTokenResult.token.trim()
          );
        });
      } else {
        userStore.setState(false, null, false, null);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {userStore.loading ? <Loader /> : <Routes />}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
