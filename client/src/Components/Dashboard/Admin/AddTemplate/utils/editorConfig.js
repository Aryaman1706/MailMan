const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "fontColor",
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
  fontColor: {
    colors: [
      {
        color: "hsl(0, 0%, 0%)",
        label: "Black",
      },
      {
        color: "hsl(240,100%,50%)",
        label: "Blue",
      },
    ],
  },
};

export default editorConfig;
