import { Grid, Button, IconButton, makeStyles } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  hidden: {
    display: "none",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    placeItems: "center",
  },
}));

const Attachments = ({ fileChangeHandler, removeFile, attachments }) => {
  const { hidden, flexContainer } = useStyles();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={2}>
        <input
          type="file"
          name="attachments"
          id="attachments"
          className={hidden}
          multiple
          onChange={(e) => fileChangeHandler(e)}
        />
        <label htmlFor="attachments">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component="span"
          >
            Add Attachments
          </Button>
        </label>
      </Grid>

      <Grid item xs={10}>
        {[...attachments].length > 0 ? (
          <Grid container alignItems="center" spacing={2}>
            {[...attachments].map((file, index) => (
              <Grid key={index} item xs={2}>
                <div className={flexContainer}>
                  <p>{file.name}</p>
                  <IconButton
                    color="secondary"
                    onClick={() => removeFile(index)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>No attachements added</p>
        )}
      </Grid>
    </Grid>
  );
};

export default Attachments;
