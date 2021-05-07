import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * Components
import Login from "../Components/Login";
import Editor from "../Components/Editor";
import Profile from "../Components/Dashboard/User/Profile";
import SignupUser from "../Components/Dashboard/Admin/SignupUser";

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={Login} />

          {/* User Dashboard */}
          <Route exact path="/user/profile" onlyUsers component={Profile} />

          {/* Admin Dashboard */}
          <Route exact path="/admin/template" onlyAdmins component={Editor} />
          <Route exact path="/admin/register" component={SignupUser} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
