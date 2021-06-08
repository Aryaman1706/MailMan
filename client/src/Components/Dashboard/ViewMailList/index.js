import { Grid } from "@material-ui/core";
import Heading from "../../Heading";
import MailListDetails from "./ui/MailListDetails";
import Loader from "../../Loader";
import EmailList from "./ui/EmailList";

import useGetMailList from "./hooks/useGetMailList";

const ViewMailList = () => {
  const [query, data] = useGetMailList();

  if (query.isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <Heading text="View Mail List" />
      <Grid
        container
        spacing={4}
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <MailListDetails mailList={data.mailList} />
        </Grid>

        <Grid item xs={6}>
          <EmailList sent={true} list={data.sent} />
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          <EmailList sent={false} list={data.unsent} />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewMailList;
