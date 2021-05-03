import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: "calc(100% - 300px)",
    marginLeft: "300px",
  },
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    placeContent: "center",
  },
}));

const AdminSideNav = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar>
          <div className={classes.navbarContainer}>
            <div>
              <Typography variant="h6" align="left">
                AV-Mailer
              </Typography>
            </div>
            <div></div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminSideNav;
