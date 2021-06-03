import { Grid, Paper } from "@material-ui/core";
import useLoadTemplate from "./useLoadTemplate";
import Loader from "../../Loader";
import Item from "./Item";
import Format from "./Format";
import Heading from "../../Heading";

const ViewTemplate = () => {
  const [query, template] = useLoadTemplate();

  if (query.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading text="Open Template" />
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Item field="Title" value={template.title} />
        <Item field="Subject" value={template.subject} />
        <Item field="Date" value={new Date(template.date).toLocaleString()} />
        <Item
          field="Content"
          component={
            <div dangerouslySetInnerHTML={{ __html: template.html }}></div>
          }
        />
        <Item field="Format" component={<Format template={template} />} />
      </Grid>
    </>
  );
};

export default ViewTemplate;
