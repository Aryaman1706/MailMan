import useUserStore from "../Stores/userStore";
import { Route, Redirect } from "react-router-dom";

const selector = (state) => ({
  loading: state.loading,
  user: state.user,
  isAdmin: state.isAdmin,
});

const RouteWrapper = ({
  component: Component,
  onlyUsers,
  onlyAdmins,
  ...rest
}) => {
  const { loading, user, isAdmin } = useUserStore(selector);

  if (onlyUsers && !loading && (!user || (user && isAdmin))) {
    console.log("not a user");
    return <Redirect to="/login" />;
  }

  if (onlyAdmins && !loading && (!user || (user && !isAdmin))) {
    console.log("not an admin");
    return <Redirect to="/login" />;
  }

  return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
