import { Grid, Typography } from "@material-ui/core";
import { initialValues, validationSchema } from "./formInit";
import { Formik } from "formik";
import Form from "./Form";

const SignupUser = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "500px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Create a new Employee Account
              </Typography>
            </Grid>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnMount={true}
              validateOnChange={true}
              component={Form}
            />
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SignupUser;
