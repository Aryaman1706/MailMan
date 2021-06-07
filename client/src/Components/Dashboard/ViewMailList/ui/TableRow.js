import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cell: {
    border: "1px solid grey",
  },
  text: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
}));

const TableRow = ({ field, value, component }) => {
  const { cell, text, bold } = useStyles();

  return (
    <Grid container spacing={1} alignItems="stretch">
      <Grid item xs={4} className={cell}>
        <p className={`${text} ${bold}`}>{field}</p>
      </Grid>
      <Grid item xs={8} className={cell}>
        <p className={text}>{value || component}</p>
      </Grid>
    </Grid>
  );
};

export default TableRow;
