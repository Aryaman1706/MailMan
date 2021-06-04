import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  boldText: {
    fontWeight: "bold",
  },
}));

const Format = ({ template }) => {
  const { boldText } = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        {Object.keys(template.format).map((key) => (
          <>
            <Grid item xs={6}>
              <Typography variant="body1" align="center" className={boldText}>
                {key}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" align="center">
                {template.format[key]}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default Format;
