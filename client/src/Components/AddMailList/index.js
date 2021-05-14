import { Grid, Typography } from "@material-ui/core";

const AddMailList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            Queue Emails
          </Typography>
        </Grid>

        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default AddMailList;
