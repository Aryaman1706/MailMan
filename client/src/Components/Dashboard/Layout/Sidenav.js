import { Grid, Toolbar, Divider, makeStyles } from "@material-ui/core";
import LinkItem from "./LinkItem";

const useStyles = makeStyles((theme) => ({
  sidenav: {
    height: "100vh",
    top: 0,
    left: 0,
    position: "sticky",
    padding: "8px",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
  linkContainer: {
    marginTop: "10px",
  },
}));

const Sidenav = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={2} className={classes.sidenav}>
        <Toolbar></Toolbar>
        <Divider></Divider>
        <Grid container spacing={1} className={classes.linkContainer}>
          <LinkItem link="/template/list" text="Template Listing" />
        </Grid>
      </Grid>
    </>
  );
};

export default Sidenav;
