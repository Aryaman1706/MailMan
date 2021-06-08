import { Button, makeStyles } from "@material-ui/core";
import Loader from "../../../Loader";

import useDownloadFile from "../hooks/useDownloadFile";

const useStyles = makeStyles(() => ({
  flexContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
  },
}));

const DownloadBtn = ({ fileName }) => {
  const { flexContainer } = useStyles();
  const [downloadFile, loading] = useDownloadFile(fileName);

  return (
    <div className={flexContainer}>
      <Button variant="contained" color="primary" onClick={downloadFile}>
        {loading ? <Loader /> : "Download"}
      </Button>
    </div>
  );
};

export default DownloadBtn;
