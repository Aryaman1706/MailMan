import { Grid, Container } from "@material-ui/core";
import { Formik } from "formik";
import MainForm from "./MainForm";
import validationSchema from "./validationSchema";

const Editor = () => {
  const initialValues = {
    title: "",
    subject: "",
    html: "",
    format: [
      {
        field: "email",
        cell: "",
      },
    ],
  };

  return (
    <>
      <>
        <Container>
          <Grid container spacing={2}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnMount={true}
              validateOnChange={false}
              validateOnBlur={false}
              component={MainForm}
            />
          </Grid>
        </Container>
      </>
    </>
  );
};

export default Editor;
