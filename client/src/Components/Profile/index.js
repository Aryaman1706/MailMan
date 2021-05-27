import { Divider, makeStyles } from "@material-ui/core";
import Account from "./Account";
import Smtp from "./Smtp";
import useUserStore from "../../Stores/userStore";
import Loader from "../Loader";

const useStyles = makeStyles(() => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
  },

  midContainer: {
    width: "500px",
  },

  divider: {
    margin: "15px 0px 15px 0px",
  },
}));

const selector = (state) => ({
  loading: state.loading,
});

const Profile = () => {
  const { loading } = useUserStore(selector);
  const { flexContainer, midContainer, divider } = useStyles();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={flexContainer}>
            <div className={midContainer}>
              <Account />
              <div className={divider}>
                <Divider></Divider>
              </div>
              <Smtp />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
