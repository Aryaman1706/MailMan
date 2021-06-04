import { Typography, Grid, Button, TextField } from "@material-ui/core";
import Loader from "../../../Loader";

import { useEffect } from "react";
import useEditSmtp from "../hooks/useEditSmtp";
import useFormHandler from "../../../../hooks/useFormHandler";
import useLoadUser from "../hooks/useLoadUser";

import { initialValues, validationSchema } from "../utils/formInit";

const Smtp = () => {
  const query = useLoadUser();
  const mutation = useEditSmtp();
  const [values, changeHandler, submitHandler, setValues] = useFormHandler(
    initialValues,
    validationSchema
  );

  useEffect(() => {
    const userSmtp = query?.data?.body?.data?.smtp;
    if (userSmtp) {
      setValues({
        email: userSmtp?.email || "",
        password: userSmtp?.password || "",
      });
    }

    // eslint-disable-next-line
  }, [query.data]);

  return (
    <>
      {mutation.isLoading || query.isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Smtp;
