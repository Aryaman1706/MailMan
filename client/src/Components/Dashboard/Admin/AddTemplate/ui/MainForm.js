import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import Attachments from "./Attachments";
import { FieldArray } from "formik";
import FormatFormRow from "./FormatFormRow";
import Loader from "../../../../Loader";

import { useRef } from "react";
import useFormHandler from "../hooks/useFormHandler";
import useFileHandler from "../hooks/useFileHandler";

import editorConfig from "../utils/editorConfig";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: "15px",
  },
  ckeditorContent: {
    "& .ck-editor__main": {
      minHeight: "50px",
      fontFamily: "arial, sans-serif",
      "& p": {
        "& span": {
          fontSize: "13.33px",
        },
        margin: "0px",
      },
    },
  },
  ckEditorCustom: {
    "& > div.ck.ck-reset.ck-editor.ck-rounded-corners": {
      "& > div.ck.ck-editor__main": {
        "& > div.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline":
          {
            paddingTop: "10px",
            paddingBottom: "10px",
            fontFamily: "arial, sans-serif",
            "& > p": {
              margin: "0px",
              fontSize: "13.33px",
            },
            "& > span": {
              fontSize: "13.33px",
            },
          },
      },
    },
  },
}));

const MainForm = (formikProps) => {
  const { textField, ckeditorContent, ckEditorCustom } = useStyles();

  const editorRef = useRef(null);

  const [
    mutation,
    changeHandler,
    editorChangeHandler,
    blurHandler,
    submitHandler,
  ] = useFormHandler(formikProps);
  const [fileChangeHandler, removeFile, attachments] = useFileHandler();

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
          className={textField}
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
          className={textField}
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

      <Grid item xs={12} className={ckEditorCustom}>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={html}
          onReady={(editor) => {
            editorRef.current = editor;
          }}
          onChange={(_, editor) => editorChangeHandler(editor)}
        />
      </Grid>

      <Grid item xs={12}>
        <Attachments
          fileChangeHandler={fileChangeHandler}
          removeFile={removeFile}
          attachments={attachments}
        />
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
          onClick={() => submitHandler(attachments)}
        >
          Add Template
        </Button>
      </Grid>
    </>
  );
};

export default MainForm;
