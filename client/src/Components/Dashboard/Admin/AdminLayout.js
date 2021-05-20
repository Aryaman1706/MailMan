import Layout from "../Layout";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const links = [
  {
    link: "/template/list",
    text: "List templates",
  },
  {
    link: "",
    text: "Add Temoplate",
  },
  {
    link: "",
    text: "Register User",
  },
  {
    link: "",
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
