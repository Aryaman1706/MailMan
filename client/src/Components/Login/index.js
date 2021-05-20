import { Grid, Typography, makeStyles } from "@material-ui/core";
import { initialValues, validationSchema } from "./formInit";
import { Formik } from "formik";
import Form from "./Form";

const useStyles = makeStyles(() => ({
  parentDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "60px",
  },
  formContainer: {
    width: "500px",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.parentDiv}>
        <div className={classes.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Welcome to AV-Mailer
              </Typography>
              <Typography variant="h6" align="center">
                Login to continue
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

export default Login;
