import { Grid, Typography, Container } from "@material-ui/core";
import useTemplateList from "../../../hooks/useTemplateList";
import Loader from "../../Loader";
import Form from "./Form";

const AddMailList = () => {
  const [query, templates] = useTemplateList();

  if (query.isLoading) {
    return (
      <Grid item xs={12}>
        <Loader />
      </Grid>
    );
  }

  if (!templates) {
    return (
      <Grid item xs={12}>
        <Typography variant="body1">No templates available.</Typography>
      </Grid>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Queue Emails
          </Typography>
        </Grid>
        <Form templates={templates} />
      </Grid>
    </Container>
  );
};

export default AddMailList;
