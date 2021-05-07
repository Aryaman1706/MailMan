import { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import Swal from "sweetalert2";
import Loader from "../../../Loader";
import useSignupUser from "./useSignupUser";

const Form = ({
  values: { email, password, smtp_email, smtp_password },
  errors,
  touched,
  handleChange,
  isValid,
  setFieldTouched,
  resetForm,
}) => {
  const mutation = useSignupUser(resetForm);

  const [adminOpt, setAdminOpt] = useState(false);

  const changeHandler = (e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };

  const submitHandler = () => {
    if (!isValid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Inputs",
        text: "Input values are not in required format.",
        showConfirmButton: true,
      });
    } else {
      const inputData = {
        email,
        password,
      };
      inputData.smtp =
        (!smtp_email || smtp_email === "") &&
        (!smtp_password || smtp_password === "")
          ? null
          : { email: smtp_email, password: smtp_password };

      mutation.mutate(inputData);
    }
  };

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
                  checked={adminOpt}
                  onChange={(e) => setAdminOpt(e.target.checked)}
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
