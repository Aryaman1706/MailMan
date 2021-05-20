import { Grid } from "@material-ui/core";
import Sidenav from "./Sidenav";

const Layout = ({ links, logout, children }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Sidenav links={links} logout={logout} />
        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
