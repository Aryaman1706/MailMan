import { Button, makeStyles, LinearProgress } from "@material-ui/core";

import useDownloadFile, { Status } from "../../../../hooks/useDownloadFile";

const useStyles = makeStyles(() => ({
  flexContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
  },
  loader: {
    width: "100px",
  },
}));

const DownloadBtn = ({ fileName }) => {
  const { flexContainer, loader } = useStyles();
  const [downloadFile, status] = useDownloadFile(fileName);

  return (
    <div className={flexContainer}>
      {status === Status.Loading ? (
        <LinearProgress className={loader} />
      ) : (
        <Button variant="contained" color="primary" onClick={downloadFile}>
          Download
        </Button>
      )}
    </div>
  );
};

export default DownloadBtn;
