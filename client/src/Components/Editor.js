import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import axios from "../utils/axios";

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
    toolbar: [
      "imageStyle:full",
      "imageStyle:side",
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
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("html", data);
    formData.append("subject", "testing");
    formData.append("file", file);

    axios.post("/mail", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={data}
        onReady={(editor) => {
          editorRef.current = editor;
          console.log(editorRef);
        }}
        onChange={(event, editor) => {
          setData(editor.getData());
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={onClickHandler}>Send</button>
    </>
  );
};

export default Editor;
