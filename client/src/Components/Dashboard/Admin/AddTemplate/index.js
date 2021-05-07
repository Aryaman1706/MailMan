import { Grid, Container } from "@material-ui/core";
import { string, object, array } from "yup";
import { Formik } from "formik";
import MainForm from "./MainForm";

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

  const customMessage = {
    required: "Required.",
    min: "Field must contain more than one row.",
    oneChar: "cell should be of only one alphabet.",
  };

  const validationSchema = object({
    title: string().trim().required(customMessage.required),
    subject: string().trim().required(customMessage.required),
    html: string().trim().required(),
    format: array()
      .of(
        object({
          field: string().trim().required(customMessage.required),
          cell: string()
            .trim()
            .length(1, customMessage.oneChar)
            .uppercase()
            .required(customMessage.required),
        })
      )
      .min(1, customMessage.min)
      .required(customMessage.required),
  });

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
