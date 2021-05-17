import { Grid } from "@material-ui/core";

const MoreInfo = ({ mailList }) => {
  return (
    <>
      <Grid container spacing={1}>
        {/* Template Title */}
        <Grid item xs={4}>
          <p style={{ fontWeight: "bold" }}>Template's Title</p>
        </Grid>
        <Grid item xs={8}>
          <p>{mailList.template.title}</p>
        </Grid>

        <Grid item xs={4}>
          <p style={{ fontWeight: "bold" }}>Email</p>
        </Grid>
        <Grid item xs={8}>
          <p>{mailList.email}</p>
        </Grid>

        <Grid item xs={4}>
          <p style={{ fontWeight: "bold" }}>Added On</p>
        </Grid>
        <Grid item xs={8}>
          <p>{new Date(mailList.addedOn).toLocaleString()}</p>
        </Grid>

        <Grid item xs={4}>
          <p style={{ fontWeight: "bold" }}>Status</p>
        </Grid>
        <Grid item xs={8}>
          <p>
            {mailList.active
              ? "Currently active"
              : mailList.complete
              ? "Completed"
              : "Currently inactive"}
          </p>
        </Grid>
      </Grid>
    </>
  );
};

export default MoreInfo;
