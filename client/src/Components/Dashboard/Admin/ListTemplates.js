import { Grid, Typography, Container, IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import useTemplateList from "../../../hooks/useTemplateList";
import Loader from "../../Loader";

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
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  placeItems: "center",
                }}
              >
                <div>
                  <Typography variant="body1">Title: {t.title}</Typography>
                  <Typography variant="subtitle1">
                    Added on:- {new Date(t.date).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ListTemplates;
