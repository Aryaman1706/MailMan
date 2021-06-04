import { Grid } from "@material-ui/core";
import Loader from "../../Loader";
import Heading from "../../Heading";
import Item from "./ui/Item";
import Format from "./ui/Format";

import useLoadTemplate from "./hooks/useLoadTemplate";

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
