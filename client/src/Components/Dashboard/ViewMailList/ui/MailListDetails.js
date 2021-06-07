import { Grid } from "@material-ui/core";
import TableRow from "./TableRow";
import StatusIcon from "./StatusIcon";
import DownloadBtn from "./DownloadBtn";

const MailListDetails = ({ mailList }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableRow field="Added By" value={mailList.email} />
        </Grid>
        <Grid item xs={12}>
          <TableRow
            field="Added On"
            value={new Date(mailList.addedOn).toLocaleString()}
          />
        </Grid>
        <Grid item xs={12}>
          <TableRow
            field="Last Sent On"
            value={
              mailList.lastSent
                ? new Date(mailList.lastSent).toLocaleString()
                : "Not sent yet"
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TableRow
            field="Active Status"
            component={<StatusIcon status={mailList.active} />}
          />
        </Grid>
        <Grid item xs={12}>
          <TableRow
            field="Completed Status"
            component={<StatusIcon status={mailList.complete} />}
          />
        </Grid>
        <Grid item xs={12}>
          <TableRow
            field="Excel File"
            component={<DownloadBtn fileName={mailList.file} />}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MailListDetails;
