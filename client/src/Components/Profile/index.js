import { Grid, Divider, makeStyles } from "@material-ui/core";
import Account from "./Account";
import Smtp from "./Smtp";
import useUserStore from "../../Stores/userStore";
import Loader from "../Loader";
import Heading from "../Heading";

const useStyles = makeStyles(() => ({
  divider: {
    margin: "15px 0px 15px 0px",
  },
}));

const selector = (state) => ({
  loading: state.loading,
});

const Profile = () => {
  const { loading } = useUserStore(selector);
  const { divider } = useStyles();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Heading text="User Profile" />
      <Grid container>
        <Grid item xs={12}>
          <Account />
        </Grid>

        <Grid item xs={12}>
          <div className={divider}>
            <Divider></Divider>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Smtp />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
