import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import TemplateInfo from "./TemplateInfo";
import useFormHandler from "./useFormHandler";
import useAddMailList from "./useAddMailList";
import Loader from "../../Loader";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    placeItems: "center",
    gap: "50px",
  },

  fileInput: {
    display: "none",
  },
}));

const Form = ({ templates }) => {
  const { flexContainer, fileInput } = useStyles();

  const [{ template, file }, changeHandler, submitHandler, fileClear] =
    useFormHandler(templates);

  const mutation = useAddMailList();

  if (mutation.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Template</InputLabel>
          <Select
            name="template"
            value={template}
            onChange={(e) => changeHandler(e)}
          >
            {templates.map((t) => (
              <MenuItem value={t} key={t.id}>
                {t.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TemplateInfo template={template} />
      </Grid>

      <Grid item xs={12}>
        <div className={flexContainer}>
          <div>
            <input
              type="file"
              name="file"
              id="file-input"
              className={fileInput}
              onChange={(e) => changeHandler(e)}
              accept=".xlsx"
            />
            <label htmlFor="file-input">
              <Button variant="contained" color="primary" component="span">
                Upload Excel file
              </Button>
            </label>
          </div>
          {file ? (
            <>
              <div>
                <Typography variant="subtitle1">{file.name}</Typography>
              </div>
              <div>
                <IconButton color="secondary" onClick={fileClear}>
                  <Delete />
                </IconButton>
              </div>
            </>
          ) : (
            <div>
              <Typography variant="subtitle1">No file selected.</Typography>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => submitHandler(mutation.mutate)}
        >
          Add to Queue
        </Button>
      </Grid>
    </>
  );
};

export default Form;
