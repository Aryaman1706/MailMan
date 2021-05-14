import { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import useTemplateList from "./useTemplateList";
import useUserStore from "../../Stores/userStore";

const selector = (state) => ({
  loading: state.loading,
});

const AddMailList = () => {
  const query = useTemplateList();
  const { loading } = useUserStore(selector);

  useEffect(() => {
    console.log("Add template component");
    console.log(`userStore loading -> ${loading}`);
  }, [loading]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            Queue Emails
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {/* Select Template Dropdown */}
        </Grid>

        <Grid item xs={12}>
          {/* Format */}
        </Grid>

        <Grid item xs={12}>
          {/* Input */}
        </Grid>
      </Grid>
    </>
  );
};

export default AddMailList;
