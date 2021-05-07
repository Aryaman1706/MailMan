import { string } from "yup";
import firebase from "firebase";
import { useState } from "react";
import { Typography, TextField, Grid, Button } from "@material-ui/core";

const Account = () => {
  const [email, setEmail] = useState(firebase.auth().currentUser?.email || "");
  const isValidEmail = () => {
    return string().email().required().isValidSync(email);
  };
  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Account Settings
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={!isValidEmail() && "Invalid Email."}
            helperText={!isValidEmail() ? "Invalid Email" : ""}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !isValidEmail() ||
              email.trim() === firebase.auth().currentUser.email.trim()
            }
          >
            Change Email
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button fullWidth variant="contained" color="primary">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
