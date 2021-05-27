import { Grid, IconButton, Typography, makeStyles } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import FormatFormRowItem from "./FormatFormRowItem";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const FormatFormRow = ({
  arrayHelpers,
  formikProps,
  changeHandler,
  blurHandler,
}) => {
  const { flexContainer } = useStyles();
  const addRow = () => {
    arrayHelpers.push({
      field: "",
      cell: "",
    });
  };

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
        <div className={flexContainer}>
          <IconButton color="primary" onClick={addRow}>
            <Add />
          </IconButton>
        </div>
      </Grid>
      {typeof formikProps.errors.format === "string" &&
        formikProps.touched.format && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="error">
              {formikProps.errors.format}
            </Typography>
          </Grid>
        )}

      {formikProps.values.format.map((obj, index) => (
        <FormatFormRowItem
          index={index}
          obj={obj}
          errors={formikProps.errors}
          touched={formikProps.touched}
          removeRow={arrayHelpers.remove}
          changeHandler={changeHandler}
          blurHandler={blurHandler}
        />
      ))}
    </>
  );
};

export default FormatFormRow;
