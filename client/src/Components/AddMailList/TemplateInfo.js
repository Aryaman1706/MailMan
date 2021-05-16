import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  tableCell: {
    border: "1px solid grey",
  },

  tableCellText: {
    textAlign: "center",
  },
}));

const TemplateInfo = ({ template }) => {
  const classes = useStyles();

  return (
    <>
      {template && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Information about selected template:-
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <p style={{ fontWeight: "bold" }}>Added on:- </p>
            </Grid>
            <Grid item xs={10}>
              <p>{new Date(template.date).toLocaleDateString()}</p>
            </Grid>

            <Grid item xs={2}>
              <p style={{ fontWeight: "bold" }}>Format:- </p>
            </Grid>
            <Grid
              item
              xs={5}
              className={classes.tableCell}
              style={{ fontWeight: "bold" }}
            >
              <p className={classes.tableCellText}>Field</p>
            </Grid>
            <Grid
              item
              xs={5}
              className={classes.tableCell}
              style={{ fontWeight: "bold" }}
            >
              <p className={classes.tableCellText}>Cell</p>
            </Grid>

            {Object.keys(template.format).map((key) => (
              <>
                <Grid item xs={2}></Grid>
                <Grid item xs={5} className={classes.tableCell}>
                  <p className={classes.tableCellText}>{key}</p>
                </Grid>
                <Grid item xs={5} className={classes.tableCell}>
                  <p className={classes.tableCellText}>
                    {template.format[key]}
                  </p>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default TemplateInfo;
