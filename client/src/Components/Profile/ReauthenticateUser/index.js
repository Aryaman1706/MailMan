import {
  Grid,
  TextField,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import Loader from "../../Loader";

import useFormHandler from "../../../hooks/useFormHandler";
import useReauthenticate from "./hooks/useReauthenticate";

import { initialValues, validationSchema } from "./utils/formInit";

const useStyles = makeStyles(() => ({}));

const ReauthenticateUser = () => {
  const {} = useStyles();
  const [state, changeHandler, submitHandler] = useFormHandler(
    initialValues,
    validationSchema
  );
  const [reauthMutation, reauth] = useReauthenticate();

  const submit = () => {
    const mutation = reauth ? null : reauthMutation;

    submitHandler(mutation.mutate);
  };

  if (reauthMutation.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" varient="h5">
            Enter Email and Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            label="Email"
            name="email"
            value={state.email}
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
            value={state.password}
            onChange={(e) => changeHandler(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => submit()}
          >
            {reauth ? "Save Changes" : "Reauthenticate"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ReauthenticateUser;
