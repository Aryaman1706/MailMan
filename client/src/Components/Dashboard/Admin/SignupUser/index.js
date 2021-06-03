import { Grid } from "@material-ui/core";
import { initialValues, validationSchema } from "./formInit";
import { Formik } from "formik";
import Form from "./Form";
import Heading from "../../../Heading";

const SignupUser = () => {
  return (
    <>
      <Heading text="Create new employee account" />
      <Grid container spacing={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          validateOnChange={true}
          component={Form}
        />
      </Grid>
    </>
  );
};

export default SignupUser;
