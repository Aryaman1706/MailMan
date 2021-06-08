import {
  Grid,
  makeStyles,
  IconButton,
  Typography,
  Paper,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";

import { useHistory } from "react-router";

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

const ListItem = ({ mailListDoc }) => {
  const { flexContainer, paper } = useStyles();
  const history = useHistory();

  const viewMailList = () => {
    history.push(`/mail-list/open/${mailListDoc.id}`);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className={paper}>
          <div className={flexContainer}>
            <div>
              <Typography variant="body1">
                {mailListDoc.email} added this to queue on{" "}
                {new Date(mailListDoc.addedOn).toLocaleString()}
              </Typography>
            </div>
            <div>
              <IconButton color="primary" onClick={viewMailList}>
                <Visibility />
              </IconButton>
            </div>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default ListItem;
