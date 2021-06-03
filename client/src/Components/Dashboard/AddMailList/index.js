import { Grid, Typography } from "@material-ui/core";
import useTemplateList from "../../../hooks/useTemplateList";
import Loader from "../../Loader";
import Form from "./Form";
import Heading from "../../Heading";

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
    <>
      <Heading text={"Queue E-mails"} />
      <Grid container spacing={2}>
        <Form templates={templates} />
      </Grid>
    </>
  );
};

export default AddMailList;
