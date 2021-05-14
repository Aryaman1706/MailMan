import firebase from "firebase";
import { Typography, Grid, Button } from "@material-ui/core";

const Account = () => {
  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Account Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left" variant="body1">
            Email:- {firebase.auth().currentUser?.email || null}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            Change Email
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;