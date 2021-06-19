import { Grid, Toolbar, Divider, makeStyles } from "@material-ui/core";
import LinkItem from "./LinkItem";
import logo from "../../../../assets/logo.png";

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
  logoDiv: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    placeItems: "center",
  },
  logoImg: {
    objectFit: "contain",
  },
}));

const Sidenav = ({ links, logout }) => {
  const { sidenav, linkContainer, logoDiv, logoImg } = useStyles();

  return (
    <>
      <Grid item xs={2} className={sidenav}>
        <Toolbar>
          <div className={logoDiv}>
            <img src={logo} alt="Absolute Veritas" className={logoImg} />
          </div>
        </Toolbar>
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
