import { Grid, Typography } from "@material-ui/core";

const Format = ({ template }) => {
  return (
    <>
      <Grid container spacing={1}>
        {Object.keys(template.format).map((key) => (
          <>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="center"
                style={{ fontWeight: "bold" }}
              >
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
