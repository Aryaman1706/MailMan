import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * General
import Login from "../Components/Login";

// * Common Dashboard
import Profile from "../Components/Profile";
import ReauthenticateUser from "../Components/Profile/ReauthenticateUser";
import AddMailList from "../Components/Dashboard/AddMailList";
import ListMailList from "../Components/Dashboard/User/ListMailList";
import ListTemplates from "../Components/Dashboard/ListTemplates";

// * Admin Dashboard
import AddTemplate from "../Components/Dashboard/Admin/AddTemplate";
import SignupUser from "../Components/Dashboard/Admin/SignupUser";
import FullListMailList from "../Components/Dashboard/Admin/ListMailList";

// * User Dashboard

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          {/* General */}
          <Route exact path="/login" component={Login} />

          {/* Common Dashboard */}
          <Route exact path="/profile" onlyUsers layout component={Profile} />
          <Route exact path="/reauthenticate" component={ReauthenticateUser} />
          <Route
            exact
            path="/mail-list/add"
            onlyUsers
            layout
            component={AddMailList}
          />
          <Route
            exact
            path="/mail-list/list"
            onlyUsers
            layout
            component={ListMailList}
          />
          <Route
            exact
            path="/template/list"
            onlyUsers
            layout
            component={ListTemplates}
          />

          {/* Admin Dashboard */}
          <Route
            exact
            path="/admin/template"
            onlyAdmins
            layout
            component={AddTemplate}
          />
          <Route
            exact
            path="/admin/register"
            onlyAdmins
            layout
            component={SignupUser}
          />
          <Route
            exact
            path="/admin/mail-list"
            onlyAdmins
            layout
            component={FullListMailList}
          />

          {/* User Dashboard */}
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
