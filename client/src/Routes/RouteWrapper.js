import useUserStore from "../Stores/userStore";
import { Route, Redirect } from "react-router-dom";
import AdminLayout from "../Components/Dashboard/Admin/AdminLayout";
import UserLayout from "../Components/Dashboard/User/UserLayout";

const selector = (state) => ({
  loading: state.loading,
  user: state.user,
  isAdmin: state.isAdmin,
});

const RouteWrapper = ({
  component: Component,
  onlyUsers,
  onlyAdmins,
  layout,
  ...rest
}) => {
  const { loading, user, isAdmin } = useUserStore(selector);

  if (onlyUsers && !loading && !user) {
    return <Redirect to="/login" />;
  }

  if (onlyAdmins && !loading && (!user || (user && !isAdmin))) {
    return <Redirect to="/" />;
  }

  if (layout && !loading && user && isAdmin) {
    return (
      <Route
        {...rest}
        render={() => <AdminLayout>{<Component />}</AdminLayout>}
      />
    );
  }

  if (layout && !loading && user && !isAdmin) {
    return (
      <Route
        {...rest}
        render={() => <UserLayout>{<Component />}</UserLayout>}
      />
    );
  }

  return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
