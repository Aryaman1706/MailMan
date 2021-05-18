import { Button } from "@material-ui/core";

const Buttons = ({ query, page, nextPage, prevPage }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          placeItems: "center",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
      >
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
            disabled={query.isPreviousData || !query.data?.body.data.hasMore}
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Buttons;
