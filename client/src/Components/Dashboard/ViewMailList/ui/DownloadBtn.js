import { Button } from "@material-ui/core";
import Loader from "../../../Loader";

import useDownloadFile from "../hooks/useDownloadFile";

const DownloadBtn = ({ fileName }) => {
  const [downloadFile, loading] = useDownloadFile(fileName);

  return (
    <>
      <Button variant="contained" color="primary" onClick={downloadFile}>
        {loading ? <Loader /> : "Download"}
      </Button>
    </>
  );
};

export default DownloadBtn;
