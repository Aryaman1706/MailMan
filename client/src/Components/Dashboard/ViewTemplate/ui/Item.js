import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  borderedCell: {
    border: "1px solid grey",
  },

  boldText: {
    fontWeight: "bold",
  },
}));

const Item = ({ field, value, component }) => {
  const { borderedCell, boldText } = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={2} className={borderedCell}>
          <Typography variant="body1" className={boldText}>
            {field}
          </Typography>
        </Grid>
        <Grid item xs={10} className={borderedCell}>
          {value ? <Typography variant="body1">{value}</Typography> : component}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Item;
