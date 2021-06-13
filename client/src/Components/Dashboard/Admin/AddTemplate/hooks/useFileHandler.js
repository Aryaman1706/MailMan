import { useState } from "react";

const useFileHandler = () => {
  const [attachements, setAttachments] = useState([]);

  const fileChangeHandler = (e) => {
    setAttachments([...e.target.files]);
  };

  const removeFile = (pos) => {
    setAttachments(
      attachements.filter((_val, index) => parseInt(index) !== parseInt(pos))
    );
  };

  return [fileChangeHandler, removeFile, attachements];
};

export default useFileHandler;
