import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { string, object } from "yup";
import Form from "./Form";

const Login = () => {
  const Yup = { string, object };
  const customMessage = {
    required: "This is a required field.",
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required(customMessage.required),
    password: Yup.string().required(customMessage.required),
  });

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
      >
        <div style={{ width: "500px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Login to Mailer
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
