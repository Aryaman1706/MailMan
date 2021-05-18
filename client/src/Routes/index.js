import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * Common
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import ReauthenticateUser from "../Components/Profile/ReauthenticateUser";
import AddMailList from "../Components/AddMailList";
import Layout from "../Components/Dashboard/Layout";

// * Admin Dashboard
import SignupUser from "../Components/Dashboard/Admin/SignupUser";
import AddTemplate from "../Components/Dashboard/Admin/AddTemplate";

// * User Dashboard
import ListMailList from "../Components/Dashboard/User/ListMailList";

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Layout} />

          {/* Common */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/user/profile" component={Profile} />
          <Route
            exact
            path="/user/reauthenticate"
            component={ReauthenticateUser}
          />
          <Route exact path="/mail-list" component={AddMailList} />

          {/* Admin Dashboard */}
          <Route exact path="/admin/template" component={AddTemplate} />
          <Route exact path="/admin/register" component={SignupUser} />

          {/* User Dashboard */}
          <Route exact path="/dashboard/mail-list" component={ListMailList} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
