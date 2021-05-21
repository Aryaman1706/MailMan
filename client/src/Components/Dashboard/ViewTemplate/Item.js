import { Grid, Typography } from "@material-ui/core";

const Item = ({ field, value, component }) => {
  return (
    <>
      <Grid item xs={2} style={{ border: "1px solid grey" }}>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {field}
        </Typography>
      </Grid>
      <Grid item xs={10} style={{ border: "1px solid grey" }}>
        {value ? <Typography variant="body1">{value}</Typography> : component}
      </Grid>
    </>
  );
};

export default Item;
