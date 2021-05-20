import { useEffect } from "react";
import firebase from "firebase";
import "firebase/auth";
import useUserStore from "../Stores/userStore";

const selector = (state) => ({
  setState: state.setState,
});

const useAuthObserver = () => {
  const { setState } = useUserStore(selector);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          setState(
            false,
            user.uid,
            Boolean(idTokenResult.claims.admin),
            idTokenResult.token.trim()
          );
        });
      } else {
        setState(false, null, false, null);
      }
    });

    // eslint-disable-next-line
  }, []);
};

export default useAuthObserver;
