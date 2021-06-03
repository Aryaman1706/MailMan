import { useRef } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { FieldArray } from "formik";
import FormatFormRow from "./FormatFormRow";
import Loader from "../../../Loader";
import useFormHandler from "./useFormHandler";
import editorConfig from "./editorConfig";

const MainForm = (formikProps) => {
  const editorRef = useRef(null);
  const [
    mutation,
    changeHandler,
    fileChangeHandler,
    editorChangeHandler,
    blurHandler,
    submitHandler,
  ] = useFormHandler(formikProps);

  const {
    values: { title, subject, html },
  } = formikProps;

  if (mutation.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          style={{ marginBottom: "15px" }}
          name="title"
          label="Title"
          value={title}
          onChange={(e) => changeHandler(e)}
          onBlur={(e) => blurHandler(e)}
          error={
            formikProps.touched?.["title"] &&
            Boolean(formikProps.errors?.["title"])
          }
          helperText={
            formikProps.touched?.["title"] &&
            Boolean(formikProps.errors?.["title"])
              ? formikProps.errors?.["title"]
              : ""
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          style={{ marginBottom: "15px" }}
          name="subject"
          label="Subject"
          value={subject}
          onChange={(e) => changeHandler(e)}
          onBlur={(e) => blurHandler(e)}
          error={
            formikProps.touched?.["subject"] &&
            Boolean(formikProps.errors?.["subject"])
          }
          helperText={
            formikProps.touched?.["subject"] &&
            Boolean(formikProps.errors?.["subject"])
              ? formikProps.errors?.["subject"]
              : ""
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={html}
          onReady={(editor) => {
            editorRef.current = editor;
          }}
          onChange={(event, editor) => editorChangeHandler(editor)}
        />
      </Grid>

      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            placeItems: "center",
            gap: "15px",
          }}
        >
          <Typography variant="h6">Add Attachments</Typography>
          <input
            type="file"
            name="attachments"
            multiple
            onChange={(e) => fileChangeHandler(e)}
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <FieldArray
            name="format"
            render={(arrayHelpers) => (
              <FormatFormRow
                arrayHelpers={arrayHelpers}
                formikProps={formikProps}
                changeHandler={changeHandler}
                blurHandler={blurHandler}
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={submitHandler}
        >
          Add Template
        </Button>
      </Grid>
    </>
  );
};

export default MainForm;
