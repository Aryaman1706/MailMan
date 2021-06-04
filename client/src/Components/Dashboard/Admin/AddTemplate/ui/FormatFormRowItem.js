import React from "react";
import { Grid, TextField, IconButton, makeStyles } from "@material-ui/core";
import Remove from "@material-ui/icons/Remove";

import { validationSchema } from "../utils/formInit";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const FormatFormRowItem = ({
  index,
  obj,
  errors,
  touched,
  removeRow,
  changeHandler,
  blurHandler,
}) => {
  const { flexContainer } = useStyles();

  return (
    <>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          name={`format[${index}].field`}
          value={obj.field}
          onChange={(e) => obj.field.trim() !== "email" && changeHandler(e)}
          onBlur={(e) => blurHandler(e, validationSchema)}
          error={
            touched.format?.[index]?.field &&
            Boolean(errors.format?.[index]?.field)
          }
          helperText={
            touched.format?.[index]?.field &&
            Boolean(errors.format?.[index]?.field)
              ? errors.format?.[index]?.field
              : ""
          }
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="text"
          variant="outlined"
          name={`format[${index}].cell`}
          value={obj.cell}
          onChange={(e) => changeHandler(e)}
          onBlur={(e) => blurHandler(e, validationSchema)}
          error={
            touched.format?.[index]?.cell &&
            Boolean(errors.format?.[index]?.cell)
          }
          helperText={
            touched.format?.[index]?.cell &&
            Boolean(errors.format?.[index]?.cell)
              ? errors.format?.[index]?.cell
              : ""
          }
        />
      </Grid>
      <Grid item xs={4}>
        <div className={flexContainer}>
          {obj.field.trim() !== "email" && (
            <IconButton color="primary" onClick={(e) => removeRow(index)}>
              <Remove />
            </IconButton>
          )}
        </div>
      </Grid>
    </>
  );
};

export default FormatFormRowItem;
