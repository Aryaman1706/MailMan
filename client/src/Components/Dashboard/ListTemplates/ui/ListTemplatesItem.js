import {
  Grid,
  Typography,
  IconButton,
  Paper,
  makeStyles,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    placeItems: "center",
  },
  paper: {
    padding: "5px",
  },
}));

const ListTemplatesItem = ({ template }) => {
  const { flexContainer, paper } = useStyles();
  const history = useHistory();

  const viewTemplate = () => {
    history.push(`/template/open/${template.id}`);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className={paper}>
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
        </Paper>
      </Grid>
    </>
  );
};

export default ListTemplatesItem;
