import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import TemplateInfo from "./TemplateInfo";
import useFormHandler from "./useFormHandler";
import useAddMailList from "./useAddMailList";
import Loader from "../Loader";

const Form = ({ templates }) => {
  const [{ template, file }, changeHandler, submitHandler, fileClear] =
    useFormHandler(templates);

  const mutation = useAddMailList();

  return (
    <>
      {mutation.isLoading ? (
        <Loader />
      ) : (
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
            <div style={{ display: "flex", placeItems: "center", gap: "50px" }}>
              <div>
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={(e) => changeHandler(e)}
                  // accept=".xlsx"
                />
                <label htmlFor="file-input">
                  <Button variant="contained" color="primary" component="span">
                    Upload Excel file
                  </Button>
                </label>
              </div>
              <div>
                {file ? (
                  <Typography variant="subtitle1">
                    {file.name || "test"}
                  </Typography>
                ) : (
                  <Typography variant="subtitle1">No file selected.</Typography>
                )}
              </div>

              {file && (
                <div>
                  <IconButton color="secondary" onClick={fileClear}>
                    <Delete />
                  </IconButton>
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
      )}
    </>
  );
};

export default Form;
