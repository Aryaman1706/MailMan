import Layout from "../Layout";
import { Button } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";

const links = [
  {
    link: "/mail-list/add",
    text: "Queue new Emails",
  },
  {
    link: "/mail-list/list",
    text: "Queued Emails",
  },
  {
    link: "/template/list",
    text: "View all Templates",
  },
  {
    link: "/profile",
    text: "Profile",
  },
];

const LogoutBtn = () => {
  const handler = () => {
    firebase.auth().signOut();
  };

  return (
    <Button fullWidth variant="contained" color="secondary" onClick={handler}>
      Logout
    </Button>
  );
};

const UserLayout = ({ children }) => {
  return <Layout links={links} logout={<LogoutBtn />} children={children} />;
};

export default UserLayout;
