import { Grid, Typography, Container } from "@material-ui/core";
import useTemplateList from "../../hooks/useTemplateList";
import Loader from "../Loader";
import Form from "./Form";

const AddMailList = () => {
  const [query, templates] = useTemplateList();

  const renderView = () => {
    if (query.isIdle) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1">Login to continue.</Typography>;
        </Grid>
      );
    }

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
          <Typography variant="body1">No templates available.</Typography>;
        </Grid>
      );
    }

    return <Form templates={templates} />;
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Queue Emails
            </Typography>
          </Grid>
          {renderView()}
        </Grid>
      </Container>
    </>
  );
};

export default AddMailList;
