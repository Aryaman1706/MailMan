import { Grid, Typography } from "@material-ui/core";
import Loader from "../../Loader";
import Heading from "../../Heading";
import ListTemplatesItem from "./ui/ListTemplatesItem";

import useTemplateList from "../../../hooks/useTemplateList";

const ListTemplates = () => {
  const [query, templates] = useTemplateList();

  if (query.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading text="List Templates" />
      {templates ? (
        <>
          <Grid container spacing={2}>
            {templates.map((t) => (
              <ListTemplatesItem key={t.id} template={t} />
            ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="body1">No templates available.</Typography>
        </>
      )}
    </>
  );
};

export default ListTemplates;
