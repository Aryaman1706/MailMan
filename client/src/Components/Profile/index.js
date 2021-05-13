import { Divider } from "@material-ui/core";
import Account from "./Account";
import Smtp from "./Smtp";
import useUserStore from "../../Stores/userStore";
import Loader from "../Loader";

const selector = (state) => ({
  loading: state.loading,
});

const Profile = () => {
  const { loading } = useUserStore(selector);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "500px" }}>
              <Account />
              <div style={{ margin: "15px 0px 15px 0px" }}>
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
