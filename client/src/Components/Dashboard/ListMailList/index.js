import { Grid, makeStyles, Button } from "@material-ui/core";
import Heading from "../../Heading";
import Loader from "../../Loader";
import ListItem from "./ui/ListItem";

import useListMailList from "../../../hooks/useListMailList";

const useStyles = makeStyles(() => ({
  btnContainer: {
    display: "flex",
    placeItems: "center",
    justifyContent: "space-around",
    marginTop: "15px",
  },
}));

const ListMailList = ({ full, promiseFn }) => {
  const { btnContainer } = useStyles();

  const [query, page, nextPage, prevPage] = useListMailList(promiseFn);

  if (query.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading text={full ? "All Queued E-mails" : "Your Queued E-mails"} />
      <Grid container>
        {query.data?.body.data.list.map((mailListDoc, index) => (
          <ListItem key={index} mailListDoc={mailListDoc} />
        ))}

        <Grid item xs={12}>
          <div className={btnContainer}>
            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={page === 0}
                onClick={prevPage}
              >
                Previous
              </Button>
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  query.isPreviousData || !query.data?.body.data.hasMore
                }
                onClick={nextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ListMailList;
