import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import Swal from "sweetalert2";
import Loader from "../Loader";
import useLoginMutate from "./useLoginHandler";

const Form = ({
  values: { email, password },
  errors,
  touched,
  handleChange,
  isValid,
  setFieldTouched,
}) => {
  const mutation = useLoginMutate();

  const changeHandler = (e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };

  const submitHandler = () => {
    if (isValid) {
      mutation.mutate({ email, password });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Inputs",
        text: "Input values are not in required format.",
        showConfirmButton: true,
      });
    }
  };

  const [show, setShow] = useState(false);

  return (
    <>
      {mutation.isLoading ? (
        <>
          <Loader />
        </>
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
        </>
      )}
    </>
  );
};

export default Form;
