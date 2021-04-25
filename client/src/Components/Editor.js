import { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'uploadImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
  simpleUpload: {
    uploadUrl: "http://localhost:5000/api/upload",
    header: {
      "Content-Type": "multipart/form-data"
    }
  }
};

const Editor = () => {
  const [data, setData] = useState("");
  const editorRef = useRef(null);

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={ editorConfig }
        data={data}
        onReady={(editor) => {
          editorRef.current = editor;
          console.log(editorRef);
        }}
        onChange={(event, editor) => {
          setData(editor.getData());
        }}
      />
    </>
  );
};

export default Editor;
