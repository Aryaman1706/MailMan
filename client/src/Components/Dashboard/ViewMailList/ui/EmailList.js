import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

import { useMemo } from "react";
import StatusIcon from "./StatusIcon";

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: "bold",
  },
}));

const generateEmailList = (list) =>
  list.map((mailList) =>
    mailList.list.map((item) => ({
      email: item.email,
      sent: mailList.sent,
      date: mailList.date || null,
    }))
  );

const EmailList = ({ sent, list }) => {
  const { bold } = useStyles();
  const emailList = useMemo(() => generateEmailList(list), [list]);

  return (
    <>
      <Grid container alignItems="stretch">
        <Grid item xs={8}>
          <Typography align="center" variant="h6">
            {sent ? "Emails Sent" : "Unsent Emails"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary">
            File
          </Button>
        </Grid>

        {emailList.map((item) => (
          <>
            <Grid item xs={5}>
              <p className={bold}>{item.email}</p>
            </Grid>
            <Grid item xs={5}>
              <p>
                {item.date
                  ? new Date(item.date).toLocaleString()
                  : "Not available"}
              </p>
            </Grid>
            <Grid item xs={2}>
              <StatusIcon status={item.sent} />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default EmailList;
