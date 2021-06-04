import { Grid, Container } from "@material-ui/core";
import Sidenav from "./ui/Sidenav";

const Layout = ({ links, logout, children }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Sidenav links={links} logout={logout} />
        <Grid item xs={10}>
          <Container>{children}</Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
