import { Typography, Grid, Button, TextField } from "@material-ui/core";
import Loader from "../Loader";
import useFormHandler from "./useFormHandler";

const Smtp = () => {
  const [values, changeHandler, submitHandler, mutation] = useFormHandler();
  return (
    <>
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                SMTP Settings
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Email"
                name="email"
                value={values.email}
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label="Password"
                name="password"
                value={values.password}
                onChange={(e) => changeHandler(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Smtp;
