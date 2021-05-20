import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  paper: {
    padding: "8px",
  },
  text: {
    color: "dark-grey",
  },
}));

const LinkItem = ({ link, text }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Link to={link} className={classes.link}>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="body1" align="center" className={classes.text}>
            {text}
          </Typography>
        </Paper>
      </Link>
    </Grid>
  );
};

export default LinkItem;
