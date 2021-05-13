import { Grid, Typography } from "@material-ui/core";
import { string, object, boolean } from "yup";
import { Formik } from "formik";
import Form from "./Form";

const SignupUser = () => {
  const Yup = { string, object, boolean };

  const initailValues = {
    isAdmin: false,
    email: "",
    password: "",
    smtp_email: "",
    smtp_password: "",
  };

  const customMessage = {
    required: "This is field is required.",
    email: "Not a valid email.",
  };

  const validationSchema = Yup.object({
    isAdmin: Yup.boolean().required(),
    email: Yup.string()
      .trim()
      .email(customMessage.email)
      .required(customMessage.required),
    password: Yup.string().trim().required(customMessage.required),
    smtp_email: Yup.string().trim().email(customMessage.email),
    smtp_password: Yup.string().trim(),
  });

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
              initialValues={initailValues}
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
