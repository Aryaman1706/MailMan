import { Grid, Typography, IconButton, makeStyles } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    placeItems: "center",
  },
}));

const ListTemplatesItem = ({ template }) => {
  const { flexContainer } = useStyles();
  const history = useHistory();

  const viewTemplate = () => {
    history.push(`/template/open/${template.id}`);
  };

  return (
    <>
      <Grid item xs={12}>
        <div className={flexContainer}>
          <div>
            <Typography variant="body1">Title: {template.title}</Typography>
            <Typography variant="subtitle1">
              Added on:- {new Date(template.date).toLocaleString()}
            </Typography>
          </div>
          <div>
            <IconButton color="primary" onClick={viewTemplate}>
              <Visibility />
            </IconButton>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default ListTemplatesItem;
