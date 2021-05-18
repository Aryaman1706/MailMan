import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import MoreInfo from "../ListMailList/MoreInfo";
import useListMailList from "../../../hooks/useListMailList";
import axios from "../../../utils/axios";
import useUserStore from "../../../Stores/userStore";
import Buttons from "../ListMailList/Buttons";
import Loader from "../../Loader";

const selector = (state) => ({
  idToken: state.idToken,
});

const ListMailList = () => {
  const { idToken } = useUserStore(selector);

  const promiseFn = (page) =>
    axios
      .get(`/mail-list/list?page=${page}`, {
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
        {query.isLoading ? (
          <Loader />
        ) : (
          <>
            {query.data?.body.data.list.map((mailList, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body1">
                    You added this to queue on{" "}
                    {new Date(mailList.addedOn).toLocaleString()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MoreInfo mailList={mailList} />
                </AccordionDetails>
              </Accordion>
            ))}
            <Buttons
              query={query}
              page={page}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ListMailList;
