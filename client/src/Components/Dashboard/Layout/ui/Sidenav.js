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

const Sidenav = ({ links, logout }) => {
  const { sidenav, linkContainer } = useStyles();

  return (
    <>
      <Grid item xs={2} className={sidenav}>
        <Toolbar></Toolbar>
        <Divider></Divider>
        <Grid container spacing={1} className={linkContainer}>
          {links.map((item, index) => (
            <LinkItem key={index} link={item.link} text={item.text} />
          ))}
          <Grid item xs={12}>
            {logout}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Sidenav;
