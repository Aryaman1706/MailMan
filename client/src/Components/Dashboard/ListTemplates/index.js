import { Grid, Typography, Container } from "@material-ui/core";
import useTemplateList from "../../../hooks/useTemplateList";
import Loader from "../../Loader";
import ListTemplatesItem from "./ListTemplatesItem";

const ListTemplates = () => {
  const [query, templates] = useTemplateList();

  return (
    <Container>
      {query.isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              List Templates
            </Typography>
          </Grid>
          {templates ? (
            <>
              {templates.map((t) => (
                <ListTemplatesItem key={t.id} template={t} />
              ))}
            </>
          ) : (
            <>
              <Typography variant="body1">No templates available.</Typography>
            </>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ListTemplates;
