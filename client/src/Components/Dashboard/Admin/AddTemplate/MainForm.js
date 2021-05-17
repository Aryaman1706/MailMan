import { useRef, useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { FieldArray } from "formik";
import FormatFormRow from "./FormatFormRow";
import Loader from "../../../Loader";
import useAddTemplate from "./useAddTemplate";

const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "outdent",
      "indent",
      "|",
      "uploadImage",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  },
  image: {
    styles: ["alignLeft", "alignCenter", "alignRight"],
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "imageTextAlternative",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  simpleUpload: {
    uploadUrl: `${process.env.REACT_APP_SERVER_URL}/template/image/upload`,
    header: {
      "Content-Type": "multipart/form-data",
    },
  },
};

const MainForm = (formikProps) => {
  const editorRef = useRef(null);
  const [attachements, setAttachments] = useState([]);
  const [mutation, submitForm] = useAddTemplate();

  const {
    values: { title, subject, html },
  } = formikProps;

  const changeHandler = (e) => {
    formikProps.setFieldValue(e.target.name, e.target.value);
  };

  const blurHandler = async (e, validationSchema) => {
    console.log(e.target.name);
    if (validationSchema) {
      try {
        await validationSchema.validateAt(e.target.name, formikProps.values);
        formikProps.setFieldError(e.target.name, undefined);
      } catch (error) {
        formikProps.setFieldError(e.target.name, error?.errors?.[0]);
      }
    } else {
      formikProps.validateField(e.target.name);
    }
    formikProps.setFieldTouched(e.target.name, true, false);
  };

  const showErrors = (errors) => {
    Object.keys(errors).forEach((field) => {
      if (field.trim() === "format" && typeof errors.format !== "string") {
        errors.format.forEach((obj, index) => {
          if (obj) {
            formikProps.setFieldTouched(`format[${index}].field`, true, false);
            formikProps.setFieldTouched(`format[${index}].cell`, true, false);
          }
        });
      } else {
        formikProps.setFieldTouched(field.toString(), true, false);
      }
    });
  };

  const submitHandler = async () => {
    const errors = await formikProps.validateForm();
    if (Object.keys(errors).length === 0) {
      const format = {};
      formikProps.values.format.forEach((obj) => {
        format[obj.field] = obj.cell;
      });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("html", html);
      formData.append("format", JSON.stringify(format));
      formData.append("attachments", attachements);

      submitForm(formData);
      formikProps.resetForm();
    } else {
      showErrors(errors);
    }
  };

  return (
    <>
      {mutation.isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Add New Template
            </Typography>
          </Grid>

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
              onChange={(event, editor) => {
                formikProps.setFieldValue("html", editor.getData());
              }}
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
                onChange={(e) => setAttachments(e.target.files)}
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
      )}
    </>
  );
};

export default MainForm;
