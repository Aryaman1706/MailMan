import { useRef } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { FieldArray } from "formik";
import FormatFormRow from "./FormatFormRow";

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

  const {
    values: { title, subject, html },
  } = formikProps;

  const changeHandler = (e) => {
    formikProps.setFieldValue(e.target.name, e.target.value);
  };

  const blurHandler = (e) => {
    formikProps.validateField(e.target.name);
    formikProps.setFieldTouched(e.target.name, true, false);
  };

  const submitHandler = async () => {
    const errors = await formikProps.validateForm();
    console.log(errors);
    // if (!errors || errors == {}) {
    //   console.log("no errors");
    // } else {
    //   console.log("errors", errors);
    // }
  };

  return (
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
