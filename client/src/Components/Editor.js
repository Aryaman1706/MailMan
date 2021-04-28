import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
  TextField,
} from "@material-ui/core";
import Swal from "sweetalert2";
import useSendMails from "../hooks/api/sendMails";

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
    uploadUrl: "http://localhost:5000/api/upload",
    header: {
      "Content-Type": "multipart/form-data",
    },
  },
};

const Editor = () => {
  const [data, setData] = useState("");
  const [subject, setSubject] = useState("");
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const [mutation, submitHandler] = useSendMails();

  const onClickHandler = () => {
    if (/\w+/g.test(data) && /\w+/g.test(subject) && file) {
      const formData = new FormData();
      formData.append("html", data);
      formData.append("subject", "testing");
      formData.append("file", file);

      submitHandler(formData);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid Data.",
        text: "Check subject, editor text and excel file.",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Typography variant="h3" align="center">
        Mailer
      </Typography>
      <Divider></Divider>
      <div style={{ marginTop: "25px" }}></div>
      {mutation.isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              placeContent: "center",
              height: "500px",
              width: "100%",
            }}
          >
            <CircularProgress
              size={80}
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </div>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            type="text"
            variant="outlined"
            style={{ marginBottom: "15px" }}
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={data}
            onReady={(editor) => {
              editorRef.current = editor;
            }}
            onChange={(event, editor) => {
              setData(editor.getData());
            }}
          />
          <div style={{ marginTop: "25px" }}>
            <label htmlFor="file">Upload excel file here</label>
            <input
              style={{ marginLeft: "10px" }}
              name="file"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "15px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={onClickHandler}
            >
              Send Emails
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Editor;
