import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  paper: {
    padding: "10px",
  },
  text: {
    color: "dark-grey",
  },
}));

const LinkItem = ({ link, text }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <NavLink to={link} className={classes.link}>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="body1" align="center" className={classes.text}>
            {text}
          </Typography>
        </Paper>
      </NavLink>
    </Grid>
  );
};

export default LinkItem;
