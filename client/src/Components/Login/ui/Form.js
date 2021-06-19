import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

import { useState } from "react";
import useLoginHandler from "../hooks/useLoginHandler";

const useStyles = makeStyles(() => ({
  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Form = (formikProps) => {
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [mutation, changeHandler, submitHandler] = useLoginHandler(formikProps);
  const {
    values: { email, password },
    errors,
    touched,
  } = formikProps;

  if (mutation.isLoading) {
    return <Loader />;
  }

  return (
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
          type={show ? "text" : "password"}
          variant="outlined"
          label="Password"
          name="password"
          value={password}
          onChange={(e) => changeHandler(e)}
          helperText={touched.password ? errors.password : ""}
          error={touched.password && Boolean(errors.password)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow((prev) => !prev)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Login
        </Button>
      </Grid>

      <Grid item xs={12}>
        <div className={classes.linkContainer}>
          <Link to="/forgot-password">
            <p>Forgot Password?</p>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default Form;
