import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import Form from "./ui/Form";
import Heading from "../../../Heading";

import { initialValues, validationSchema } from "./utils/formInit";

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
