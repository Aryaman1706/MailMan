import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import LoginRoute from "./LoginRoute";

// * General
import Login from "../Components/Login";

// * Common Dashboard
import Profile from "../Components/Profile/General";
import AddMailList from "../Components/Dashboard/AddMailList";
import UserMailListing from "../Components/Dashboard/User/UserMailListing";
import ListTemplates from "../Components/Dashboard/ListTemplates";
import ViewTemplate from "../Components/Dashboard/ViewTemplate";

// * Admin Dashboard
import AddTemplate from "../Components/Dashboard/Admin/AddTemplate";
import SignupUser from "../Components/Dashboard/Admin/SignupUser";
import AdminMailListing from "../Components/Dashboard/Admin/AdminMailListing";

// * User Dashboard

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          {/* General */}
          <LoginRoute exact path="/login" component={Login} />

          {/* Common Dashboard */}
          <Route exact path="/profile" onlyUsers layout component={Profile} />
          <Route
            exact
            path="/mail-list/add"
            onlyUsers
            layout
            component={AddMailList}
          />
          <Route exact path="/" onlyUsers layout component={UserMailListing} />
          <Route
            exact
            path="/template/list"
            onlyUsers
            layout
            component={ListTemplates}
          />
          <Route
            exact
            path="/template/open/:templateId"
            onlyUsers
            layout
            component={ViewTemplate}
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
            component={AdminMailListing}
          />

          {/* User Dashboard */}
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
