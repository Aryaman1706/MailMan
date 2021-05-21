import { Grid, Typography, IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const ListTemplatesItem = ({ template }) => {
  const history = useHistory();

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
            <IconButton
              color="primary"
              onClick={() => {
                history.push(`/template/open/${template.id}`);
              }}
            >
              <Visibility />
            </IconButton>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default ListTemplatesItem;
