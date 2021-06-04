import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Loader from "../../../../Loader";

import useSignupUser from "../hooks/useSignupUser";

const Form = (formikProps) => {
  const [mutation, changeHandler, submitHandler] = useSignupUser(formikProps);

  const {
    values: { email, password, smtp_email, smtp_password, isAdmin },
    errors,
    touched,
  } = formikProps;

  return (
    <>
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => changeHandler(e)}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => changeHandler(e)}
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              SMTP Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="SMTP Email Address"
              name="smtp_email"
              value={smtp_email}
              onChange={(e) => changeHandler(e)}
              helperText={touched.smtp_email ? errors.smtp_email : ""}
              error={touched.smtp_email && Boolean(errors.smtp_email)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="SMTP Password"
              name="smtp_password"
              value={smtp_password}
              onChange={(e) => changeHandler(e)}
              helperText={touched.smtp_password ? errors.smtp_password : ""}
              error={touched.smtp_password && Boolean(errors.smtp_password)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => changeHandler(e)}
                />
              }
              label="Admin Account"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitHandler}
            >
              Create new account
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default Form;
