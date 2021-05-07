import { Grid, TextField, IconButton, Typography } from "@material-ui/core";
import { Remove, Add } from "@material-ui/icons";

const FormatFormRow = ({
  arrayHelpers,
  formikProps,
  changeHandler,
  blurHandler,
}) => {
  return (
    <>
      <Grid item xs={4}>
        <Typography variant="h6" align="center">
          Field
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" align="center">
          Cell
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            color="primary"
            onClick={(e) =>
              arrayHelpers.push({
                field: "",
                cell: "",
              })
            }
          >
            <Add />
          </IconButton>
        </div>
      </Grid>

      {formikProps.values.format.map((obj, index) => {
        const name = `format[${index}]`;
        return (
          <>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                name={`${name}.field`}
                value={obj.field}
                onChange={(e) => changeHandler(e)}
                onBlur={(e) => blurHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                name={`${name}.cell`}
                value={obj.cell}
                onChange={(e) => changeHandler(e)}
                onBlur={(e) => blurHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  color="primary"
                  onClick={(e) => arrayHelpers.remove(index)}
                >
                  <Remove />
                </IconButton>
              </div>
            </Grid>
          </>
        );
      })}
    </>
  );
};

export default FormatFormRow;
