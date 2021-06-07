import { Grid } from "@material-ui/core";
import Heading from "../../Heading";
import MailListDetails from "./ui/MailListDetails";
import Loader from "../../Loader";

import useGetMailList from "./hooks/useGetMailList";

const ViewMailList = () => {
  // const [query, data] = useGetMailList();

  // if (query.isLoading) {
  //   return <Loader />;
  // }

  const obj = { email: "test", addedOn: new Date(), lastSent: null };

  return (
    <>
      <Heading text="View Mail List" />
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <MailListDetails mailList={obj} />
        </Grid>

        <Grid item xs={6}>
          {/*  */}
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={6}>
          {/*  */}
        </Grid>
      </Grid>
    </>
  );
};

export default ViewMailList;
