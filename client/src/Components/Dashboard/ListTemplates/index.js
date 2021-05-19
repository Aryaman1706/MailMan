import { Grid, Typography, Container } from "@material-ui/core";
import useTemplateList from "../../../hooks/useTemplateList";
import Loader from "../../Loader";
import ListTemplatesItem from "./ListTemplatesItem";

const ListTemplates = () => {
  const [query, templates] = useTemplateList();

  return (
    <Container>
      {query.isLoading || !templates ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              List Templates
            </Typography>
          </Grid>
          {templates.map((t) => (
            <ListTemplatesItem template={t} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ListTemplates;
