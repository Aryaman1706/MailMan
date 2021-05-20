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
    link: "/admin/mail-list",
    text: "Queued Emails (full)",
  },
  {
    link: "/admin/template",
    text: "Add new Template",
  },
  {
    link: "/template/list",
    text: "List Templates",
  },
  {
    link: "/admin/register",
    text: "Register User",
  },
  {
    link: "/profile",
    text: "Profile",
  },
];

const LogoutBtn = () => {
  //   const history = useHistory();

  const handler = () => {
    firebase.auth().signOut();
    // history.push("/login") ;
  };

  return (
    <Button fullWidth variant="contained" color="secondary" onClick={handler}>
      Logout
    </Button>
  );
};

const AdminLayout = ({ children }) => {
  return <Layout links={links} logout={<LogoutBtn />} children={children} />;
};

export default AdminLayout;
