import { Typography, Grid, Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";

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
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
