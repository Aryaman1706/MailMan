import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * General
import Login from "../Components/Login";
import Layout from "../Components/Dashboard/Layout";

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
          <Route exact path="/" component={Layout} />
          <Route exact path="/login" component={Login} />

          {/* Common Dashboard */}
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/reauthenticate" component={ReauthenticateUser} />
          <Route exact path="/mail-list/add" component={AddMailList} />
          <Route exact path="/mail-list/list" component={ListMailList} />
          <Route exact path="/template/list" component={ListTemplates} />
          {/* <Route exact path="/template/view/:id" component={} /> */}

          {/* Admin Dashboard */}
          <Route exact path="/admin/template" component={AddTemplate} />
          <Route exact path="/admin/register" component={SignupUser} />
          <Route exact path="/admin/mail-list" component={FullListMailList} />

          {/* User Dashboard */}
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
