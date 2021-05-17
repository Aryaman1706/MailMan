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

const ListMailList = () => {
  return (
    <>
      <Container>
        {[
          {
            template: {
              title: "testing mailer",
            },
            email: "test@mail.com",
            addedOn: Date.now(),
            active: false,
            complete: false,
          },
          {
            template: {
              title: "testing mailer",
            },
            email: "test@mail.com",
            addedOn: Date.now(),
            active: false,
            complete: false,
          },
          {
            template: {
              title: "testing mailer",
            },
            email: "test@mail.com",
            addedOn: Date.now(),
            active: false,
            complete: false,
          },
        ].map((mailList, index) => (
          <Accordion>
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
            <Button variant="contained" color="primary">
              Previous
            </Button>
          </div>

          <div>
            <Button variant="contained" color="primary">
              Next
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListMailList;
