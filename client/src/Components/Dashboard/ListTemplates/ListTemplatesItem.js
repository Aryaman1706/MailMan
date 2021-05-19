import { Grid, Typography, IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";

const ListTemplatesItem = ({ template }) => {
  return (
    <>
      <Grid item xs={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            placeItems: "center",
          }}
        >
          <div>
            <Typography variant="body1">Title: {template.title}</Typography>
            <Typography variant="subtitle1">
              Added on:- {new Date(template.date).toLocaleString()}
            </Typography>
          </div>
          <div>
            <IconButton color="primary">
              <Visibility />
            </IconButton>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default ListTemplatesItem;
