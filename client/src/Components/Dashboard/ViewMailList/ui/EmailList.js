import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

import { useMemo } from "react";
import StatusIcon from "./StatusIcon";

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: "bold",
  },
}));

const generateEmailList = (list) => {
  const emailList = [];

  list.forEach((mailListItem) => {
    mailListItem.list.forEach((item) => {
      emailList.push({
        email: item.email,
        sent: mailListItem.sent,
        sentOn: mailListItem.sentOn,
      });
    });
  });

  console.log({ emailList });
  return emailList;
};

const EmailList = ({ sent, list }) => {
  const { bold } = useStyles();
  const emailList = useMemo(() => generateEmailList(list), [list]);

  return (
    <>
      <Grid container alignItems="stretch">
        <Grid item xs={8}>
          <Typography variant="h6">
            {sent ? "Emails Sent" : "Unsent Emails"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" color="primary">
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
                {item.sent && item.sentOn
                  ? new Date(item.sentOn).toLocaleString()
                  : "Waiting..."}
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
