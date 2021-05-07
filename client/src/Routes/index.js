import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * Components
import Login from "../Components/Login";

// * Admin Dashboard
import SignupUser from "../Components/Dashboard/Admin/SignupUser";
import AddTemplate from "../Components/Dashboard/Admin/AddTemplate";

// * User Dashboard
import Profile from "../Components/Dashboard/User/Profile";

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={Login} />

          {/* User Dashboard */}
          <Route exact path="/user/profile" onlyUsers component={Profile} />

          {/* Admin Dashboard */}
          <Route exact path="/admin/template" component={AddTemplate} />
          <Route exact path="/admin/register" component={SignupUser} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
