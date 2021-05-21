import { useQuery } from "react-query";
import firebase from "firebase";
import "firebase/auth";
import useUserStore from "../Stores/userStore";

const selector = (state) => ({
  setLoading: state.setLoading,
  setIdToken: state.setIdToken,
});

const useRefreshToken = () => {
  const { setLoading, setIdToken } = useUserStore(selector);

  const queryFn = () => {
    console.log("refreshing token");
    setLoading(true);
    return firebase
      .auth()
      .currentUser.getIdTokenResult(true)
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };

  const query = useQuery("refreshIdToken", queryFn, {
    enabled: Boolean(firebase.auth().currentUser),
    refetchInterval: 30 * 60 * 1000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 15 * 60 * 1000,
    onError: (error) => {
      firebase.auth().signOut();
    },
    onSuccess: (idTokenResult) => {
      setLoading(false);
      setIdToken(idTokenResult.token.trim());
    },
  });

  return query;
};

export default useRefreshToken;
