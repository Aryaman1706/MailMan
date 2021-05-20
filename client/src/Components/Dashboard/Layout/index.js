import { Grid } from "@material-ui/core";
import Sidenav from "./Sidenav";

const Layout = ({ children }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Sidenav />
        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
