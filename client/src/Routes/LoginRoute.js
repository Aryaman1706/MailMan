import { Route, Redirect } from "react-router-dom";
import useUserStore from "../Stores/userStore";

const selector = (state) => ({
  loading: state.loading,
  user: state.user,
});

const LoginRoute = ({ component: Component, ...rest }) => {
  const { loading, user } = useUserStore(selector);

  if (!loading && user) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
};

export default LoginRoute;
