import { Grid, Typography, Container, Divider } from "@material-ui/core";
import useLoadTemplate from "./useLoadTemplate";
import Loader from "../../Loader";
import Item from "./Item";
import Format from "./Format";

const ViewTemplate = () => {
  const [query, template] = useLoadTemplate();

  return (
    <>
      <Container>
        {query.isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Open Template
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider></Divider>
            </Grid>
            <Item field="Title" value={template.title} />
            <Item field="Subject" value={template.subject} />
            <Item
              field="Date"
              value={new Date(template.date).toLocaleString()}
            />
            <Item
              field="Content"
              component={
                <div dangerouslySetInnerHTML={{ __html: template.html }}></div>
              }
            />
            <Item field="Format" component={<Format template={template} />} />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ViewTemplate;
