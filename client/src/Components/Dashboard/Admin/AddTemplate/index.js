import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import MainForm from "./ui/MainForm";
import Heading from "../../../Heading";

import { initialValues, validationSchema } from "./utils/formInit";

const Editor = () => {
  return (
    <>
      <Heading text="Add New template" />
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
    </>
  );
};

export default Editor;
