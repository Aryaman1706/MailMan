import { Grid, IconButton, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import FormatFormRowItem from "./FormatFormRowItem";

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
      {typeof formikProps.errors.format === "string" &&
      formikProps.touched.format ? (
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="error">
            {formikProps.errors.format}
          </Typography>
        </Grid>
      ) : (
        <></>
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
