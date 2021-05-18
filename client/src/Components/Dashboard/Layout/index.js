import {
  Drawer,
  Divider,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: "240px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "240px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button style={{ backgroundColor: "grey" }}>
              <Link
                to="/test"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <div style={{ height: "100%", width: "100%" }}>
                  <ListItemText primary={"Testing"} />
                </div>
              </Link>
            </ListItem>

            <ListItem button style={{ backgroundColor: "grey" }}>
              <Link
                to="/test"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemText primary={"Testing"} />
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          <p>jhsjhjhjhjhjhjj</p>
        </main>
      </div>
    </>
  );
};

export default Layout;
