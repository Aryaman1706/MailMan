import {
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import useFormHandler from "../../../hooks/useFormHandler";
import { initialValues, validationSchema } from "./formInit";
import useReauthenticate from "./useReauthenticate";
import Loader from "../../Loader";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "15px",
  },
}));

const ReauthenticateUser = () => {
  const { container } = useStyles();
  const [state, changeHandler, submitHandler] = useFormHandler(
    initialValues,
    validationSchema
  );
  const mutation = useReauthenticate();

  return (
    <>
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <Container className={container}>
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
                onClick={() => submitHandler()}
              >
                Reauthenticate
              </Button>
            </Grid>
          </Grid>

          <p>
            {mutation.data.user
              ? "User reauthenticated"
              : "User needs to reauthenticate"}
          </p>
        </Container>
      )}
    </>
  );
};

export default ReauthenticateUser;
