import { Grid, Button } from "@material-ui/core";
import MoreInfoItem from "./MoreInfoItem";
import useDownloadFile from "./useDownloadFile";

const MoreInfo = ({ mailList }) => {
  const [downloadFile, loading] = useDownloadFile(mailList.file);
  return (
    <>
      <Grid container spacing={1}>
        <MoreInfoItem
          title={"Template's Title"}
          value={mailList.template.title}
        />

        <MoreInfoItem title={"Added By"} value={mailList.email} />

        <MoreInfoItem
          title={"Added On"}
          value={new Date(mailList.addedOn).toLocaleString()}
        />

        <MoreInfoItem
          title={"Status"}
          value={
            mailList.active
              ? "Currently active"
              : mailList.complete
              ? "Completed"
              : "Currently inactive"
          }
        />

        <MoreInfoItem
          title={"Excel File"}
          component={
            <>
              {!loading && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={downloadFile}
                >
                  Download
                </Button>
              )}
            </>
          }
        />
      </Grid>
    </>
  );
};

export default MoreInfo;
