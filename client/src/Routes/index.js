import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * Components
import Login from "../Components/Login";

// * Admin Dashboard
import SignupUser from "../Components/Dashboard/Admin/SignupUser";
import AddTemplate from "../Components/Dashboard/Admin/AddTemplate";

// * User Dashboard

// * Common
import Profile from "../Components/Profile";
import ReauthenticateUser from "../Components/Profile/ReauthenticateUser";
import AddMailList from "../Components/AddMailList";

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={Login} />

          {/* Common */}
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
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
