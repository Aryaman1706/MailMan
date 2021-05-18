import { Grid } from "@material-ui/core";

const MoreInfoItem = ({ title, value, component }) => {
  return (
    <>
      <Grid item xs={4}>
        <p style={{ fontWeight: "bold" }}>{title}</p>
      </Grid>
      <Grid item xs={8}>
        {value ? <p>{value}</p> : component}
      </Grid>
    </>
  );
};

export default MoreInfoItem;
