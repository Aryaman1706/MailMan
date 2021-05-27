import { Grid, Typography, makeStyles } from "@material-ui/core";
import { initialValues, validationSchema } from "./formInit";
import { Formik } from "formik";
import Form from "./Form";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  subContainer: {
    width: "500px",
  },
}));

const SignupUser = () => {
  const { container, subContainer } = useStyles();

  return (
    <>
      <div className={container}>
        <div className={subContainer}>
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
