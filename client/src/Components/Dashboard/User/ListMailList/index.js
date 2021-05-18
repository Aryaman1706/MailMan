import {
  Button,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import MoreInfo from "./MoreInfo";
import useListMailList from "../../../../hooks/useListMailList";
import axios from "../../../../utils/axios";
import useUserStore from "../../../../Stores/userStore";

const selector = (state) => ({
  idToken: state.idToken,
});

const ListMailList = () => {
  const { idToken } = useUserStore(selector);

  const promiseFn = (page) =>
    axios
      .get(`/mail-list/full-list?page=${page}`, {
        headers: {
          "auth-id-token": idToken,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw err.response.data;
      });

  const [query, page, nextPage, prevPage] = useListMailList(promiseFn);

  return (
    <>
      <Container>
        {query.data?.body.data.list.map((mailList, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body1">
                Added On {new Date(mailList.addedOn).toLocaleString()} by{" "}
                {mailList.email}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MoreInfo mailList={mailList} />
            </AccordionDetails>
          </Accordion>
        ))}
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
      </Container>
    </>
  );
};

export default ListMailList;
