import { Typography, Grid, Button, TextField } from "@material-ui/core";
import Loader from "../Loader";
import useEditSmtp from "./useEditSmtp";
import useFormHandler from "../../hooks/useFormHandler";
import { initialValues, validationSchema } from "./formInit";

const Smtp = () => {
  const [values, changeHandler, submitHandler] = useFormHandler(
    initialValues,
    validationSchema
  );
  const mutation = useEditSmtp();

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
                onClick={() => submitHandler(mutation.mutate)}
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
