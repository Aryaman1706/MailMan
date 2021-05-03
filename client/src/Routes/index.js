import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

// * Components
import Login from "../Components/Login";
import Editor from "../Components/Editor";

const Routes = () => {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin/template" onlyAdmins component={Editor} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
